import { Time } from "@sodiumlabs/duration";

/**
 * The available time units.
 */
export const units = ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"] as const;

/**
 * A time unit.
 */
export type Unit = (typeof units)[number];

/**
 * The values in milliseconds of each time unit.
 */
export const unitValues: Record<Unit, number> = {
    millisecond: Time.Millisecond,
    second: Time.Second,
    minute: Time.Minute,
    hour: Time.Hour,
    day: Time.Day,
    week: Time.Week,
    month: Time.Month,
    year: Time.Year,
};
