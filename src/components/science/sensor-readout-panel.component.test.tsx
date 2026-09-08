import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SensorReadoutPanel } from "./sensor-readout-panel.component";

describe("SensorReadoutPanel", () => {
  it("renders each readout tile", () => {
    render(
      <SensorReadoutPanel
        readouts={[
          { title: "Gravimetric Array", subtitle: "Shift +18 mGal at 03:40" },
          { title: "Ion Density Probe", subtitle: "44.6 particles/cm³" },
        ]}
      />,
    );
    expect(screen.getByText("Gravimetric Array")).toBeInTheDocument();
    expect(screen.getByText("Ion Density Probe")).toBeInTheDocument();
  });
});
