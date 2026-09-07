import { describe, expect, it } from "vitest";
import { truncate } from "./truncate.util";

describe("truncate", () => {
  it("leaves short strings unchanged", () => {
    expect(truncate("FWD", 4)).toBe("FWD");
  });

  it("cuts longer strings down to maxLength", () => {
    expect(truncate("DORSAL", 4)).toBe("DORS");
  });
});
