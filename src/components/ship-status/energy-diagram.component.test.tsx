import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { EnergyDiagram } from "./energy-diagram.component";

const INITIAL_SYSTEMS = useEnergyDistributionStore.getState().systems;

describe("EnergyDiagram", () => {
  afterEach(() => {
    act(() => {
      useEnergyDistributionStore.setState({ systems: INITIAL_SYSTEMS });
    });
  });

  it("shows the reactor's max output and total allocated percentage", () => {
    render(<EnergyDiagram />);

    expect(screen.getByText("850")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("shows each system's label, percentage, and GWH share", () => {
    render(<EnergyDiagram />);

    expect(screen.getByText("Drive")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
    expect(screen.getByText("255.0 GWH")).toBeInTheDocument();
  });
});
