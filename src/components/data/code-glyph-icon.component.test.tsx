import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CodeGlyphIcon } from "./code-glyph-icon.component";

describe("CodeGlyphIcon", () => {
  it("renders one SVG element per shape", () => {
    const { container } = render(
      <CodeGlyphIcon
        shapes={[
          { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
          { tag: "path", attrs: { d: "M8 12 H16" } },
        ]}
      />,
    );

    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("rect")).toBeInTheDocument();
    expect(container.querySelector("path")).toBeInTheDocument();
  });

  it("renders circle shapes", () => {
    const { container } = render(
      <CodeGlyphIcon shapes={[{ tag: "circle", attrs: { cx: "12", cy: "12", r: "2" } }]} />,
    );

    expect(container.querySelector("circle")).toBeInTheDocument();
  });
});
