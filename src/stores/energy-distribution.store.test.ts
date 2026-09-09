import { act } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useEnergyDistributionStore } from "./energy-distribution.store";

const INITIAL_SYSTEMS = useEnergyDistributionStore.getState().systems;

function totalPercent(): number {
  return useEnergyDistributionStore
    .getState()
    .systems.reduce((sum, system) => sum + system.percent, 0);
}

describe("useEnergyDistributionStore", () => {
  afterEach(() => {
    act(() => {
      useEnergyDistributionStore.setState({ systems: INITIAL_SYSTEMS });
    });
  });

  it("starts with allocations summing to 100", () => {
    expect(totalPercent()).toBe(100);
  });

  it("sets the target system's allocation and keeps the total at 100", () => {
    act(() => {
      useEnergyDistributionStore.getState().setAllocation("drive", 60);
    });

    const { systems } = useEnergyDistributionStore.getState();
    expect(systems.find((system) => system.id === "drive")?.percent).toBe(60);
    expect(totalPercent()).toBe(100);
  });

  it("clamps the target allocation to 0-100", () => {
    act(() => {
      useEnergyDistributionStore.getState().setAllocation("weapons", 150);
    });

    expect(
      useEnergyDistributionStore.getState().systems.find((system) => system.id === "weapons")
        ?.percent,
    ).toBe(100);
    expect(totalPercent()).toBe(100);
  });

  it("splits the remainder evenly when every other system is at zero", () => {
    act(() => {
      useEnergyDistributionStore.getState().setAllocation("drive", 100);
    });
    expect(totalPercent()).toBe(100);

    act(() => {
      useEnergyDistributionStore.getState().setAllocation("drive", 40);
    });

    const { systems } = useEnergyDistributionStore.getState();
    const others = systems.filter((system) => system.id !== "drive");
    expect(others.every((system) => system.percent === 12)).toBe(true);
    expect(totalPercent()).toBe(100);
  });
});
