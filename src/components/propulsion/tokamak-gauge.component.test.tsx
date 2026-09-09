import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TokamakGauge } from "./tokamak-gauge.component";

describe("TokamakGauge", () => {
  it("renders an svg gauge", () => {
    const { container } = render(<TokamakGauge percent={99} />);
    expect(container.querySelector("svg.tokamak-gauge")).toBeInTheDocument();
    expect(container.querySelectorAll("circle")).toHaveLength(3);
  });

  it("clamps out-of-range percentages", () => {
    const { container } = render(<TokamakGauge percent={150} />);
    expect(container.querySelector("svg.tokamak-gauge")).toBeInTheDocument();
  });
});
