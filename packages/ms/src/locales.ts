import { Unit } from "./units";

/**
 * The options and translations of a locale.
 */
export interface LocaleDefinition {
    units: Record<Unit, UnitDefinition>;
}

/**
 * The translations of a time unit.
 */
export interface UnitDefinition {
    /**
     * The short name of the unit.
     */
    short: string;
    /**
     * The long name of the unit.
     *
     * @example
     * ```ts
     * long: c => (c > 1 ? "plural form" : "singular form")
     * ```
     *
     * @param c - The absolute value of the rounded number.
     */
    long: (c: number) => string;
    /**
     * The names of the unit. Should be all lowercase.
     *
     * @remarks
     * The values of `short` and `long` are not automatically added
     * to this array, so you probably want to add them here too
     * if you want them to be used in the parse function.
     */
    names: string[];
}

export type CompleteLocaleDefinition = LocaleDefinition & {
    /**
     * A map from the translated unit name to the corresponding unit name.
     */
    mappedUnits: Map<string, Unit>;
};

/**
 * The locales definitions. You can add or edit a locale definition directly here,
 * or use {@link setLocale}.
 */
export const locales = new Map<string, CompleteLocaleDefinition>();

/**
 * Add or edit a locale definition.
 *
 * @param locale - The locale (e.g. `it`)
 * @param definition - The definition
 */
export const setLocale = (locale: string, definition: LocaleDefinition) => {
    const mappedUnits = new Map<string, Unit>();
    for (const [unit, def] of Object.entries(definition.units) as [Unit, UnitDefinition][]) {
        for (const name of def.names) {
            mappedUnits.set(name.toLowerCase(), unit);
        }
    }

    locales.set(locale, {
        ...definition,
        mappedUnits,
    });
};

// Define the default locales

const defaultLocales: Record<string, LocaleDefinition> = {
    en: {
        units: {
            millisecond: {
                short: "ms",
                long: c => (c > 1 ? "milliseconds" : "millisecond"),
                names: ["milliseconds", "millisecond", "msecs", "msec", "ms"],
            },
            second: {
                short: "s",
                long: c => (c > 1 ? "seconds" : "second"),
                names: ["seconds", "second", "secs", "sec", "s"],
            },
            minute: {
                short: "m",
                long: c => (c > 1 ? "minutes" : "minute"),
                names: ["minutes", "minute", "mins", "min", "m"],
            },
            hour: {
                short: "h",
                long: c => (c > 1 ? "hours" : "hour"),
                names: ["hours", "hour", "hrs", "hr", "h"],
            },
            day: {
                short: "d",
                long: c => (c > 1 ? "days" : "day"),
                names: ["days", "day", "d"],
            },
            week: {
                short: "w",
                long: c => (c > 1 ? "weeks" : "week"),
                names: ["weeks", "week", "w"],
            },
            month: {
                short: "mo",
                long: c => (c > 1 ? "months" : "month"),
                names: ["months", "month", "mo"],
            },
            year: {
                short: "y",
                long: c => (c > 1 ? "years" : "year"),
                names: ["years", "year", "yrs", "yr", "y"],
            },
        },
    },
    fr: {
        units: {
            millisecond: {
                short: "ms",
                long: c => (c > 1 ? "millisecondes" : "milliseconde"),
                names: ["millisecondes", "milliseconde", "ms"],
            },
            second: {
                short: "s",
                long: c => (c > 1 ? "secondes" : "seconde"),
                names: ["secondes", "seconde", "secs", "sec", "s"],
            },
            minute: {
                short: "m",
                long: c => (c > 1 ? "minutes" : "minute"),
                names: ["minutes", "minute", "mins", "min", "m"],
            },
            hour: {
                short: "h",
                long: c => (c > 1 ? "heures" : "heure"),
                names: ["heures", "heure", "h"],
            },
            day: {
                short: "j",
                long: c => (c > 1 ? "jours" : "jour"),
                names: ["jours", "jour", "j"],
            },
            week: {
                short: "sem",
                long: c => (c > 1 ? "semaines" : "semaine"),
                names: ["semaines", "semaine", "sem"],
            },
            month: {
                short: "mo",
                long: _ => "mois",
                names: ["mois", "mo"],
            },
            year: {
                short: "an",
                long: c => (c > 1 ? "années" : "année"),
                names: ["années", "annees", "année", "annee", "ans", "an"],
            },
        },
    },
    de: {
        units: {
            millisecond: {
                short: "ms",
                long: c => (c > 1 ? "Millisekunden" : "Millisekunde"),
                names: ["millisekunden", "millisekunde", "ms"],
            },
            second: {
                short: "s",
                long: c => (c > 1 ? "Sekunden" : "Sekunde"),
                names: ["sekunden", "sekunde", "seks", "sek", "s"],
            },
            minute: {
                short: "m",
                long: c => (c > 1 ? "Minuten" : "Minute"),
                names: ["minuten", "minute", "mins", "min", "m"],
            },
            hour: {
                short: "h",
                long: c => (c > 1 ? "Stunden" : "Stunde"),
                names: ["stunden", "stunde", "hrs", "hr", "h"],
            },
            day: {
                short: "t",
                long: c => (c > 1 ? "Tage" : "Tag"),
                names: ["tage", "tag", "t", "d"],
            },
            week: {
                short: "w",
                long: c => (c > 1 ? "Wochen" : "Woche"),
                names: ["wochen", "woche", "wo", "w"],
            },
            month: {
                short: "mo",
                long: c => (c > 1 ? "Monate" : "Monat"),
                names: ["monate", "monat", "mon", "mo"],
            },
            year: {
                short: "j",
                long: c => (c > 1 ? "Jahre" : "Jahr"),
                names: ["jahre", "jahr", "j", "y"],
            },
        },
    },
    es: {
        units: {
            millisecond: {
                short: "ms",
                long: c => (c > 1 ? "milisegundos" : "milisegundo"),
                names: ["milisegundos", "milisegundo", "ms"],
            },
            second: {
                short: "s",
                long: c => (c > 1 ? "segundos" : "segundo"),
                names: ["segundos", "segundo", "s"],
            },
            minute: {
                short: "min",
                long: c => (c > 1 ? "minutos" : "minuto"),
                names: ["minutos", "minuto", "mins", "min", "m"],
            },
            hour: {
                short: "h",
                long: c => (c > 1 ? "horas" : "hora"),
                names: ["horas", "hora", "hrs", "hr", "h"],
            },
            day: {
                short: "d",
                long: c => (c > 1 ? "días" : "día"),
                names: ["días", "dias", "día", "dia", "d"],
            },
            week: {
                short: "sem",
                long: c => (c > 1 ? "semanas" : "semana"),
                names: ["semanas", "semana", "sem"],
            },
            month: {
                short: "mes",
                long: c => (c > 1 ? "meses" : "mes"),
                names: ["meses", "mes", "mo"],
            },
            year: {
                short: "a",
                long: c => (c > 1 ? "años" : "año"),
                names: ["años", "anos", "año", "ano", "a"],
            },
        },
    },
};

for (const [locale, definition] of Object.entries(defaultLocales)) {
    setLocale(locale, definition);
}
