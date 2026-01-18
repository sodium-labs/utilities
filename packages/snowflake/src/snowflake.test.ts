import { describe, it, expect } from "vitest";
import { Snowflake } from "./snowflake";

const snowflake = new Snowflake(0);

describe("snowflake", () => {
    it("should generate and deconstruct a snowflake", () => {
        const options = { timestamp: Date.now(), workerId: 1n, processId: 2n };
        const id = snowflake.generate(options);
        const data = snowflake.deconstruct(id);

        expect(data.timestamp).toBe(BigInt(options.timestamp));
        expect(data.workerId).toBe(options.workerId);
        expect(data.processId).toBe(options.processId);
    });

    it("should have the right worker ID and process ID", () => {
        const id1 = snowflake.generate();
        const data1 = snowflake.deconstruct(id1);
        expect(data1.workerId).toBe(0n);
        expect(data1.processId).toBe(1n);

        const id2 = snowflake.generate({ workerId: 1n, processId: 2n });
        const data2 = snowflake.deconstruct(id2);
        expect(data2.workerId).toBe(1n);
        expect(data2.processId).toBe(2n);
    });

    it("should extract the timestamp using timestampFrom", () => {
        const timestamp = Date.now();
        const id = snowflake.generate({ timestamp });

        expect(snowflake.timestampFrom(id)).toBe(timestamp);
    });
});
