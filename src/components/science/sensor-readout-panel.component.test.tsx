import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SensorReadoutPanel } from "./sensor-readout-panel.component";

describe("SensorReadoutPanel", () => {
  it("renders each readout tile", () => {
    render(
      <SensorReadoutPanel
        readouts={[
          {
            value: "+18",
            unit: "mGal",
            title: "Gravimetric Array",
            subtitle: "Shift detected at 03:40",
          },
          {
            value: "44.6",
            unit: "cm⁻³",
            title: "Ion Density Probe",
            subtitle: "Particle count",
          },
        ]}
      />,
    );
    expect(screen.getByText("Gravimetric Array", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Ion Density Probe", { exact: false })).toBeInTheDocument();
  });
});
