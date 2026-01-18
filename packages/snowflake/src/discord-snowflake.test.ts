import { describe, it, expect } from "vitest";
import { discordSnowflake } from "./discord-snowflake";

describe("discord snowflake", () => {
    it("should convert a timestamp to the right ID", () => {
        const id = discordSnowflake.generate({ timestamp: 1768617781186 });
        expect(discordSnowflake.timestampFrom(id)).toBe(1768617781186);
    });

    it("should extract the right timestamp from the ID", () => {
        expect(discordSnowflake.timestampFrom("1461913675098095707")).toBe(1768617781186);
    });
});
