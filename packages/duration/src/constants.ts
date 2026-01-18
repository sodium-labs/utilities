/**
 * Common time constants, expressed in milliseconds.
 */
export enum Time {
    Nanosecond = 0.000_001,
    Microsecond = 0.001,
    Millisecond = 1,
    Second = 1_000,
    Minute = 60_000,
    Hour = 3_600_000,
    Day = 86_400_000,
    Week = 604_800_000,
    /**
     * 30 days
     */
    Month = 2_592_000_000,
    /**
     * 365 days
     */
    Year = 31_536_000_000,
    /**
     * Average month (365.25d / 12)
     */
    AverageMonth = 2_629_800_000,
    /**
     * Average year (365.25d, accounting for leap years)
     */
    AverageYear = 31_557_600_000,
}

/**
 * Common time constants, expressed in seconds.
 */
export enum TimeSeconds {
    Nanosecond = 0.000_000_001,
    Microsecond = 0.000_001,
    Millisecond = 0.001,
    Second = 1,
    Minute = 60,
    Hour = 3_600,
    Day = 86_400,
    Week = 604_800,
    /**
     * 30 days
     */
    Month = 2_592_000,
    /**
     * 365 days
     */
    Year = 31_536_000,
    /**
     * Average month (365.25d / 12)
     */
    AverageMonth = 2_629_800,
    /**
     * Average year (365.25d, accounting for leap years)
     */
    AverageYear = 31_557_600,
}
