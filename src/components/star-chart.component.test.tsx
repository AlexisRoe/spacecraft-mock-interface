import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StarChart } from "./star-chart.component";

const WAYPOINTS = [
  { name: "TAU CETI e", xPct: 46, yPct: 24 },
  { name: "GLIESE 581", xPct: 33, yPct: 12 },
];

describe("StarChart", () => {
  it("renders the caption, ship marker and waypoints", () => {
    render(
      <StarChart caption="GAL. LONGITUDE · SECTOR 14" waypoints={WAYPOINTS} activeIndex={1} />,
    );
    expect(screen.getByText("GAL. LONGITUDE · SECTOR 14")).toBeInTheDocument();
    expect(screen.getByText("◄ SHIP")).toBeInTheDocument();
    expect(screen.getByText("TAU CETI e")).toBeInTheDocument();
    expect(screen.getByText("GLIESE 581")).toHaveClass("star-chart__marker-label--active");
  });
});
