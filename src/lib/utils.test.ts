import { describe, expect, it } from "vitest";
import { formatCurrency, initials } from "@/lib/utils";

describe("formatCurrency", () => {
  it("formats whole-dollar amounts without decimals", () => {
    expect(formatCurrency(9000000)).toBe("$9,000,000");
  });

  it("formats compact amounts with a magnitude suffix", () => {
    expect(formatCurrency(9000000, { compact: true })).toMatch(/^\$9(\.\d)?M$/);
  });
});

describe("initials", () => {
  it("takes the first letter of the first two words", () => {
    expect(initials("Glacius Thermal")).toBe("GT");
  });

  it("handles a single-word name", () => {
    expect(initials("Meridian")).toBe("M");
  });
});
