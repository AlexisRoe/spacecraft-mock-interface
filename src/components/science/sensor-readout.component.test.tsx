import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SensorReadout } from "./sensor-readout.component";

describe("SensorReadout", () => {
  it("renders the value, unit, title, and subtitle", () => {
    render(
      <SensorReadout
        value="+18"
        unit="mGal"
        title="Gravimetric Array"
        subtitle="Shift detected at 03:40"
      />,
    );
    expect(screen.getByText("+18")).toBeInTheDocument();
    expect(screen.getByText("mGal")).toBeInTheDocument();
    expect(screen.getByText("Gravimetric Array", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Shift detected at 03:40")).toBeInTheDocument();
  });
});
