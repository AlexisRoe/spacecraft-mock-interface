import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { usePropulsionStore } from "../../stores/propulsion.store";
import { ReactorPowerPanel } from "./reactor-power-panel.component";

describe("ReactorPowerPanel", () => {
  afterEach(() => {
    act(() => {
      usePropulsionStore.setState({ loadProfile: "balanced" });
      useEnergyDistributionStore.setState({
        systems: [
          { id: "drive", label: "Drive", percent: 30 },
          { id: "lifeSupport", label: "Life Support", percent: 25 },
          { id: "sensors", label: "Sensors", percent: 20 },
          { id: "shields", label: "Shields", percent: 12 },
          { id: "weapons", label: "Weapons", percent: 8 },
          { id: "comms", label: "Comms", percent: 5 },
        ],
      });
    });
  });

  it("renders reactor output and bus allocation", () => {
    render(<ReactorPowerPanel />);
    expect(screen.getByText("Tokamak Core")).toBeInTheDocument();
    expect(screen.getByText("Bus Allocation")).toBeInTheDocument();
    expect(screen.getAllByText("Drive").length).toBeGreaterThan(0);
  });

  it("applies a load profile preset to the energy distribution store", () => {
    render(<ReactorPowerPanel />);
    screen.getByText("Drive", { selector: ".reactor-power-panel__profile-name" }).click();
    const drive = useEnergyDistributionStore
      .getState()
      .systems.find((system) => system.id === "drive");
    expect(drive?.percent).toBe(55);
    expect(usePropulsionStore.getState().loadProfile).toBe("drive");
  });
});
