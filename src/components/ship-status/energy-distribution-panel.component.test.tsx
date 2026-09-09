import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { EnergyDistributionPanel } from "./energy-distribution-panel.component";

const INITIAL_SYSTEMS = useEnergyDistributionStore.getState().systems;

describe("EnergyDistributionPanel", () => {
  afterEach(() => {
    act(() => {
      useEnergyDistributionStore.setState({ systems: INITIAL_SYSTEMS, isReactorOnline: true });
    });
  });

  it("renders a dialer per system with its current allocation", () => {
    render(<EnergyDistributionPanel />);

    expect(screen.getByRole("slider", { name: "Drive" })).toHaveAttribute("aria-valuenow", "30");
    expect(screen.getByRole("slider", { name: "Weapons" })).toHaveAttribute("aria-valuenow", "8");
  });

  it("rescales the other systems in the store when one dialer changes", () => {
    render(<EnergyDistributionPanel />);

    const driveBar = screen.getByRole("slider", { name: "Drive" });
    fireEvent.keyDown(driveBar, { key: "ArrowUp" });

    const total = useEnergyDistributionStore
      .getState()
      .systems.reduce((sum, system) => sum + system.percent, 0);
    expect(total).toBe(100);
    expect(screen.getByRole("slider", { name: "Drive" })).toHaveAttribute("aria-valuenow", "31");
  });

  it("renders the reactor shutdown button", () => {
    render(<EnergyDistributionPanel />);
    expect(screen.getByRole("button", { name: "Emergency Shutdown" })).toBeInTheDocument();
  });

  it("disables the dialers once the reactor is shut down", () => {
    render(<EnergyDistributionPanel />);

    fireEvent.click(screen.getByRole("button", { name: "Emergency Shutdown" }));

    expect(screen.getByRole("slider", { name: "Drive" })).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByRole("slider", { name: "Drive" })).toHaveAttribute("aria-disabled", "true");
  });
});
