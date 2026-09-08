import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SensorReadout } from "./sensor-readout.component";

describe("SensorReadout", () => {
  it("renders the title and subtitle", () => {
    render(<SensorReadout title="Gravimetric Array" subtitle="Shift +18 mGal at 03:40" />);
    expect(screen.getByText("Gravimetric Array")).toBeInTheDocument();
    expect(screen.getByText("Shift +18 mGal at 03:40")).toBeInTheDocument();
  });
});
