import { describe, expect, it } from "vitest";
import { CODE_GLYPHS, findCodeGlyph, LINE_BREAK_TOKEN } from "./code-glyphs.util";

describe("code-glyphs.util", () => {
  it("assigns a unique 3-digit code to every glyph", () => {
    const codes = CODE_GLYPHS.map((glyph) => glyph.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const code of codes) {
      expect(code).toMatch(/^\d{3}$/);
    }
  });

  it("gives every glyph at least one shape", () => {
    for (const glyph of CODE_GLYPHS) {
      expect(glyph.shapes.length).toBeGreaterThan(0);
    }
  });

  it("does not collide with the line break token", () => {
    expect(CODE_GLYPHS.some((glyph) => glyph.code === LINE_BREAK_TOKEN)).toBe(false);
  });

  it("finds a glyph by code", () => {
    const first = CODE_GLYPHS[0];
    expect(findCodeGlyph(first.code)).toBe(first);
  });

  it("returns undefined for an unknown code", () => {
    expect(findCodeGlyph("999")).toBeUndefined();
  });
});
