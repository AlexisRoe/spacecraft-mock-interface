import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ShipSystem } from "../../stores/ship-systems.store";
import { ShipSystemPanel } from "./ship-system-panel.component";

const SYSTEMS: ShipSystem[] = [
  { id: "sensors", callout: "01", label: "Sensor & Comms Array", value: 98 },
  { id: "bridge", callout: "02", label: "Bridge / Command", value: 100 },
];

describe("ShipSystemPanel", () => {
  it("renders a button per system with its label and value", () => {
    render(<ShipSystemPanel systems={SYSTEMS} selectedSystem={null} onSelect={() => {}} />);

    expect(screen.getByText("Sensor & Comms Array")).toBeInTheDocument();
    expect(screen.getByText("98%")).toBeInTheDocument();
    expect(screen.getByText("Bridge / Command")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("marks the selected system's button active", () => {
    render(<ShipSystemPanel systems={SYSTEMS} selectedSystem="bridge" onSelect={() => {}} />);

    expect(screen.getByRole("button", { name: /Bridge \/ Command/ })).toHaveClass(
      "ship-system-panel__button--active",
    );
    expect(screen.getByRole("button", { name: /Sensor & Comms Array/ })).not.toHaveClass(
      "ship-system-panel__button--active",
    );
  });

  it("calls onSelect with the clicked system's id", () => {
    const onSelect = vi.fn();
    render(<ShipSystemPanel systems={SYSTEMS} selectedSystem={null} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole("button", { name: /Sensor & Comms Array/ }));

    expect(onSelect).toHaveBeenCalledWith("sensors");
  });
});
