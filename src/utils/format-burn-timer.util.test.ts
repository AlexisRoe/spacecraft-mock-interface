import { describe, expect, it } from "vitest";
import { formatBurnTimer } from "./format-burn-timer.util";

describe("formatBurnTimer", () => {
  it("formats zero seconds", () => {
    expect(formatBurnTimer(0)).toBe("00:00:00");
  });

  it("formats seconds and minutes", () => {
    expect(formatBurnTimer(125)).toBe("00:02:05");
  });

  it("formats hours", () => {
    expect(formatBurnTimer(3661)).toBe("01:01:01");
  });
});
