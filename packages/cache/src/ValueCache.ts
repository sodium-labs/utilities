/**
 * Tha ValueCache options.
 */
export interface ValueCacheOptions {
    /**
     * The default time-to-live of the value.
     */
    ttl?: number;
}

/**
 * TTL cache for a single value.
 *
 * @example
 * ```ts
 * const value = new ValueCache({ ttl: 10_000 }).set("some value");
 *
 * value.get(); // "some value"
 *
 * await sleep(11_000);
 *
 * value.get(); // undefined
 * ```
 */
export class ValueCache<T> {
    /**
     * The cache options.
     */
    public readonly options: Required<ValueCacheOptions>;

    private _value: T | undefined;
    private _timer: NodeJS.Timeout | null;
    private _expiresAt: number | null;

    public constructor(options?: ValueCacheOptions) {
        this.options = Object.assign({ ttl: 0 }, options);
        this._timer = null;
        this._expiresAt = null;
    }

    /**
     * Get the duration until expiration. Will be
     * `null` if there is no value or it already expired.
     */
    public get expiresIn() {
        if (!this._expiresAt) return null;

        const expiresIn = this._expiresAt - Date.now();
        return expiresIn <= 0 ? null : expiresIn;
    }

    /**
     * Get the expiration timestamp. Will be
     * `null` if there is no value or it already expired.
     */
    public get expiresAt() {
        return this._expiresAt;
    }

    /**
     * Get the value.
     */
    public get(): T | undefined {
        return this._value;
    }

    /**
     * Set the value.
     *
     * @param value - The new value
     * @param ttl - The time-to-live (defaults to the one specified in the class options)
     * @returns The value you just added
     *
     * @throws Error if `ttl` is undefined and none was specified in the class options. Or if `ttl <= 0`.
     */
    public set(value: T, ttl?: number): T {
        const timerTTL = ttl ?? this.options.ttl;
        if (timerTTL <= 0) throw new Error("Cannot set the value of a ValueCache with no TTL");

        if (this._timer) {
            clearTimeout(this._timer);
        }

        this._value = value;
        this._timer = setTimeout(() => this.clear(), timerTTL);
        this._expiresAt = Date.now() + timerTTL;

        return value;
    }

    /**
     * Clear the value.
     */
    public clear() {
        this._value = undefined;
        this._expiresAt = null;
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }
}
