import { Snowflake } from "./snowflake";

/**
 * A class for parsing snowflake ids using Discord's snowflake epoch.
 *
 * The Discord epoch is `1420070400000` (`2015-01-01T00:00:00.000Z`), see {@link https://discord.com/developers/docs/reference#snowflakes}.
 */
export const discordSnowflake = new Snowflake(1420070400000n);
