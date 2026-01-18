import { describe, expect, it } from "vitest";
import { ms } from "./index";

describe("ms(string, { locale: 'fr' })", () => {
    it("should support translation", () => {
        expect(ms("1 année", { locale: "fr" })).toBe(31536000000);
        expect(ms("5 jours", { locale: "fr" })).toBe(432000000);
        expect(ms("3j2secondes", { locale: "fr" })).toBe(259202000);
    });
});

describe("ms(number, { locale: 'fr', ... })", () => {
    it("should support translation", () => {
        expect(ms(31536000000, { locale: "fr" })).toBe("1an");
        expect(ms(31536000000, { locale: "fr", long: true })).toBe("1 année");

        expect(ms(63072000000, { locale: "fr" })).toBe("2an");
        expect(ms(63072000000, { locale: "fr", long: true })).toBe("2 années");

        expect(ms(432000000, { locale: "fr" })).toBe("5j");
        expect(ms(432000000, { locale: "fr", long: true })).toBe("5 jours");

        expect(ms(259202001, { locale: "fr", compound: true })).toBe("3j2s1ms");
        expect(ms(259202001, { locale: "fr", compound: true, long: true })).toBe("3 jours 2 secondes 1 milliseconde");

        expect(ms(259202001, { locale: "fr", compound: true, maxUnits: 2 })).toBe("3j2s");
        expect(ms(259202001, { locale: "fr", compound: true, long: true, maxUnits: 2 })).toBe("3 jours 2 secondes");
    });
});
