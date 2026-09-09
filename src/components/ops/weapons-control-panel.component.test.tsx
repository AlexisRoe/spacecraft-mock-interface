import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { useWeaponsStore } from "../../stores/weapons.store";
import { WeaponsControlPanel } from "./weapons-control-panel.component";

const INITIAL_WEAPONS = useWeaponsStore.getState();
const INITIAL_ENERGY = useEnergyDistributionStore.getState();

describe("WeaponsControlPanel", () => {
  afterEach(() => {
    act(() => {
      useWeaponsStore.setState({
        ...INITIAL_WEAPONS,
        plasmaCannons: INITIAL_WEAPONS.plasmaCannons.map((cannon) => ({ ...cannon })),
      });
      useEnergyDistributionStore.setState(INITIAL_ENERGY);
    });
  });

  it("shows the selected target's shield and hull readouts", () => {
    render(<WeaponsControlPanel />);
    expect(screen.getByText("88%")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("shows both plasma cannons and the torpedo tubes", () => {
    render(<WeaponsControlPanel />);
    expect(screen.getByText("Plasma Cannon A")).toBeInTheDocument();
    expect(screen.getByText("Plasma Cannon B")).toBeInTheDocument();
    expect(screen.getByText("Torpedo Tubes")).toBeInTheDocument();
  });

  it("disables fire buttons until a lock is acquired", () => {
    render(<WeaponsControlPanel />);
    expect(screen.getByRole("button", { name: /Discharge Plasma/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Launch Torpedo/ })).toBeDisabled();
  });

  it("enables the plasma fire button once locked, ready, and energized", () => {
    render(<WeaponsControlPanel />);
    act(() => useWeaponsStore.getState().acquireLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().tickLock());
    expect(screen.getByRole("button", { name: /Discharge Plasma/ })).not.toBeDisabled();
  });

  it("keeps fire buttons disabled with no energy allocated to weapons, even when locked", () => {
    act(() =>
      useEnergyDistributionStore.setState({
        systems: INITIAL_ENERGY.systems.map((system) =>
          system.id === "weapons" ? { ...system, percent: 0 } : system,
        ),
      }),
    );
    render(<WeaponsControlPanel />);
    act(() => useWeaponsStore.getState().acquireLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().tickLock());
    expect(screen.getByRole("button", { name: /Discharge Plasma/ })).toBeDisabled();
  });

  it("fires a torpedo when armed, decrementing rounds", () => {
    render(<WeaponsControlPanel />);
    act(() => useWeaponsStore.getState().acquireLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => screen.getByRole("button", { name: /Launch Torpedo/ }).click());
    expect(screen.getByText("13 of 20 Rounds")).toBeInTheDocument();
  });
});
