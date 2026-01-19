/**
 * The cache options.
 */
export interface CacheOptions {
    /**
     * The default time-to-live of the values.
     *
     * @defaultValue `0`
     */
    ttl?: number;
    /**
     * The check interval. The check will remove
     * all expired keys present in the cache.
     *
     * @defaultValue `600_000`
     */
    checkInterval?: number;
}

/**
 * The wrapper of a value stored in the cache.
 */
export interface CacheWrapper<V> {
    /**
     * The expiration timestamp of the value.
     */
    t: number;
    /**
     * The value.
     */
    v: V;
}

/**
 * Lightweight key-value TTL cache.
 *
 * @example
 * ```ts
 * const cache = new Cache({ ttl: 10_000 });
 *
 * cache.set("key", "value");
 *
 * cache.has("key"); // true
 * cache.get("key"); // "value"
 *
 * await sleep(11_000);
 *
 * cache.has("key"); // false
 * cache.get("key"); // undefined
 * ```
 */
export class Cache<K extends string, V> {
    /**
     * The cache options.
     */
    public readonly options: Required<CacheOptions>;
    /**
     * The inner Map containing all data.
     */
    public readonly data: Map<K, CacheWrapper<V>>;

    private checkTimeout?: NodeJS.Timeout;

    public constructor(options?: CacheOptions) {
        this.options = Object.assign(
            {
                ttl: 0,
                checkInterval: 600_000,
            },
            options,
        );

        this.data = new Map();

        this._checkData = this._checkData.bind(this);
        this._checkData();
    }

    /**
     * Get a value.
     */
    public get(key: K): V | undefined {
        const v = this.data.get(key);
        if (v && this._check(key, v)) return this._unwrap(v);
        return undefined;
    }

    /**
     * Set a value.
     *
     * @param key - The key
     * @param value - The value
     * @param ttl - The time-to-live (defaults to the one specified in the class options)
     *
     * @throws Error if `ttl` is undefined and none was specified in the class options. Or if `ttl <= 0`.
     */
    public set(key: K, value: V, ttl?: number): void {
        const timerTTL = ttl ?? this.options.ttl;
        if (timerTTL <= 0) throw new Error(`Cannot set a value with no TTL (key: '${key}', ttl: '${timerTTL}')`);

        this.data.set(key, this._wrap(value, timerTTL));
    }

    /**
     * Get and delete the value associated with the key.
     *
     * Equivalent to `.get()` + `.delete()`.
     */
    public take(key: K): V | undefined {
        const v = this.data.get(key);
        if (v && this._check(key, v)) {
            this.delete(key);
            return this._unwrap(v);
        }
        return undefined;
    }

    /**
     * Set a value without changing its TTL.
     *
     * If there is no value with this key, it will add it.
     *
     * @param key - The key
     * @param value - The new value
     * @param ttl - The TTL used if it adds the value (defaults to the one specified in the class options)
     *
     * @throws Error if `ttl` is undefined and none was specified in the class options. Or if `ttl <= 0`.
     */
    public update(key: K, value: V, ttl?: number): void {
        const v = this.data.get(key);

        const timerTTL = ttl ?? this.options.ttl;
        if (timerTTL <= 0) throw new Error(`Cannot update a value with no TTL (key: '${key}', ttl: '${timerTTL}')`);

        this.data.set(key, {
            t: v && this._check(key, v) ? v.t : Date.now() + timerTTL,
            v: value,
        });
    }

    /**
     * Check if a key is present in the cache.
     *
     * @param key - The key to check
     * @returns If the key is present or not
     */
    public has(key: K): boolean {
        const v = this.data.get(key);
        return !!v && this._check(key, v);
    }

    /**
     * Returns the value of the first element in the cache
     * where predicate is true, and undefined otherwise.
     */
    public find(fn: (v: V) => boolean): V | undefined {
        for (const [k, v] of this.data.entries()) {
            if (!this._check(k, v)) continue;
            if (fn(v.v)) return v.v;
        }

        return undefined;
    }

    /**
     * Get the duration until expiration of a key. Will be
     * `null` if there is no value or it already expired.
     */
    public expiresIn(key: K): number | null {
        const v = this.data.get(key);
        const expiresIn = v && this._check(key, v) ? v.t - Date.now() : null;
        return !expiresIn || expiresIn <= 0 ? null : expiresIn;
    }

    /**
     * Get the expiration timestamp of a key. Will be
     * `null` if there is no value or it already expired.
     */
    public expiresAt(key: K): number | null {
        const v = this.data.get(key);
        return v && this._check(key, v) ? v.t : null;
    }

    /**
     * Set the TTL of a key.
     *
     * @param key - The key
     * @param ttl - The new TTL (defaults to the one specified in the class options)
     *
     * @throws Error if `ttl` is undefined and none was specified in the class options. Or if `ttl <= 0`.
     */
    public setTTL(key: K, ttl?: number): boolean {
        const v = this.data.get(key);
        if (!v || !this._check(key, v)) return false;

        const timerTTL = ttl ?? this.options.ttl;
        if (timerTTL <= 0) throw new Error(`Cannot setTTL with no TTL specified (key: '${key}', ttl: '${timerTTL}')`);

        v.t = Date.now() + timerTTL;
        return true;
    }

    /**
     * Delete a key.
     *
     * @returns If the key was deleted
     */
    public delete(key: K): boolean {
        return this.data.delete(key);
    }

    /**
     * Clear all keys.
     */
    public clear() {
        this.data.clear();
    }

    /**
     * Get an array of all keys (including expired ones still present in the inner map).
     */
    public keys(): K[] {
        return [...this.data.keys()];
    }

    private _checkData(): void {
        for (const entries of this.data.entries()) {
            this._check(entries[0], entries[1]);
        }

        this.checkTimeout = setTimeout(this._checkData, this.options.checkInterval);
        this.checkTimeout.unref();
    }

    private _check(key: K, value: CacheWrapper<V>): boolean {
        if (value.t < Date.now()) {
            this.delete(key);
            return false;
        }

        return true;
    }

    private _wrap(value: V, ttl: number): CacheWrapper<V> {
        return {
            t: Date.now() + ttl,
            v: value,
        };
    }

    private _unwrap(value: CacheWrapper<V>): V {
        return value.v;
    }
}
