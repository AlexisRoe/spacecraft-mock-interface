import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SensorField } from "./sensor-field.component";

describe("SensorField", () => {
  it("renders the plot", () => {
    render(<SensorField seed={7} />);
    expect(screen.getByLabelText("Sensor phase field plot")).toBeInTheDocument();
  });
});
