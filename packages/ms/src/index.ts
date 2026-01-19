import { locales } from "./locales";
import { Unit, unitValues } from "./units";

export type { Unit };
export * from "./locales";
export { units } from "./units";

/**
 * The options.
 */
export interface Options {
    /**
     * Set to `true` to use verbose formatting. Defaults to `false`.
     */
    long?: boolean;
    /**
     * The locale. Defaults to `en`.
     */
    locale?: string;
    /**
     * Format the duration with multiple units, e.g. `2m50s100ms` instead of `2m`.
     */
    compound?: boolean;
    /**
     * The max amount of units used in the compound format.
     */
    maxUnits?: number;
}

/**
 * Parse or format the given value.
 *
 * **Note:** returns `NaN` if `value` was a string and could not be parsed.
 *
 * @param value - The string or number to convert
 * @param options - Options for the conversion
 * @throws Error if `value` is not a non-empty string or a number
 */
export function ms(value: string, options?: Options): number;
export function ms(value: number, options?: Options): string;
export function ms(value: string | number, options?: Options): number | string {
    if (typeof value === "string") {
        return parse(value, options);
    } else if (typeof value === "number") {
        return format(value, options);
    }
    throw new Error(`Value provided to ms() must be a string or number. value=${JSON.stringify(value)}`);
}

/**
 * Parse the given string and return milliseconds.
 *
 * @param str - A string to parse into milliseconds. Length must be in [1;100]
 * @returns The parsed value in milliseconds, or `NaN` if the string can't be parsed
 */
export function parse(str: string, options?: Options): number {
    if (typeof str !== "string" || str.length === 0 || str.length > 100) {
        throw new Error(
            `Value provided to ms.parse() must be a string with length between 1 and 99. value=${JSON.stringify(str)}`,
        );
    }

    const locale = locales.get(options?.locale ?? "en");
    if (!locale) {
        throw new Error(`Unknown locale "${options?.locale}"`);
    }

    let total = 0;
    let consumed = false;

    const tokenRegex = /(?<value>-?\d*\.?\d+) *(?<unit>[a-zàèìòùáéíóúýâêîôûãñõäëïöüÿçµ]+)?/gi;
    let match: RegExpExecArray | null;
    let lastIndex = 0;

    while ((match = tokenRegex.exec(str)) !== null) {
        if (str.slice(lastIndex, match.index).trim().length !== 0) {
            return NaN;
        }

        const { value: rawValue, unit: rawUnit = "ms" } = match.groups as {
            value: string;
            unit: string | undefined;
        };

        const value = parseFloat(rawValue);
        if (Number.isNaN(value)) {
            return NaN;
        }

        const unit = !rawUnit ? "millisecond" : locale.mappedUnits.get(rawUnit.toLowerCase());
        if (!unit) {
            return NaN;
        }

        total += value * unitValues[unit];
        consumed = true;

        lastIndex = tokenRegex.lastIndex;
    }

    if (!consumed || str.slice(lastIndex).trim().length !== 0) {
        return NaN;
    }

    return total;
}

/**
 * Format the given integer as a string.
 *
 * @param ms - milliseconds
 * @param options - Options for the conversion
 * @returns The formatted string
 */
export function format(ms: number, options?: Options): string {
    if (typeof ms !== "number" || !Number.isFinite(ms)) {
        throw new Error("Value provided to ms.format() must be of type number.");
    }

    const locale = locales.get(options?.locale ?? "en");
    if (!locale) {
        throw new Error(`Unknown locale "${options?.locale}"`);
    }

    const sign = ms < 0 ? "-" : "";
    let remaining = Math.abs(ms);

    // units sorted by descending size
    const units = Object.entries(locale.units)
        .map(([unit, def]) => ({
            unit,
            def,
            value: unitValues[unit as Unit],
        }))
        .sort((a, b) => b.value - a.value);

    // === simple mode (current behavior) ===
    if (!options?.compound) {
        for (const { def, value } of units) {
            if (remaining >= value) {
                const amount = Math.round(ms / value);

                if (options?.long) {
                    return `${amount} ${def.long(Math.abs(amount))}`;
                }

                return `${amount}${def.short}`;
            }
        }

        const msDef = locale.units.millisecond;
        return options?.long ? `${ms} ${msDef.long(Math.abs(ms))}` : `${ms}${msDef.short}`;
    }

    // === compound mode ===
    const parts: string[] = [];
    let usedUnits = 0;

    for (const { def, value } of units) {
        if (remaining < value) continue;

        const amount = Math.floor(remaining / value);
        remaining -= amount * value;

        if (amount > 0) {
            parts.push(options?.long ? `${amount} ${def.long(amount)}` : `${amount}${def.short}`);

            usedUnits++;
            if (options?.maxUnits && usedUnits >= options.maxUnits) {
                break;
            }
        }
    }

    // fallback if everything was < 1ms
    if (parts.length === 0) {
        const msDef = locale.units.millisecond;
        parts.push(options?.long ? `0 ${msDef.long(0)}` : `0${msDef.short}`);
    }

    return sign + parts.join(options?.long ? " " : "");
}
