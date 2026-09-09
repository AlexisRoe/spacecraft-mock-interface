import { act } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { usePropulsionStore } from "./propulsion.store";

describe("usePropulsionStore", () => {
  afterEach(() => {
    act(() => {
      usePropulsionStore.setState({
        selectedTorchId: "s1",
        fuelPercent: 62.4,
        burnActive: false,
        burnSeconds: 0,
        loadProfile: "balanced",
      });
    });
  });

  it("selects a torch", () => {
    act(() => {
      usePropulsionStore.getState().selectTorch("p2");
    });
    expect(usePropulsionStore.getState().selectedTorchId).toBe("p2");
  });

  it("toggles the burn on and off, resetting the timer", () => {
    act(() => {
      usePropulsionStore.getState().toggleBurn();
      usePropulsionStore.getState().tickBurn();
      usePropulsionStore.getState().tickBurn();
    });
    expect(usePropulsionStore.getState().burnActive).toBe(true);
    expect(usePropulsionStore.getState().burnSeconds).toBe(2);

    act(() => {
      usePropulsionStore.getState().toggleBurn();
    });
    expect(usePropulsionStore.getState().burnActive).toBe(false);
    expect(usePropulsionStore.getState().burnSeconds).toBe(0);
  });

  it("consumes fuel on each burn tick", () => {
    const before = usePropulsionStore.getState().fuelPercent;
    act(() => {
      usePropulsionStore.getState().tickBurn();
    });
    expect(usePropulsionStore.getState().fuelPercent).toBeLessThan(before);
  });

  it("sets the active load profile", () => {
    act(() => {
      usePropulsionStore.getState().setLoadProfile("drive");
    });
    expect(usePropulsionStore.getState().loadProfile).toBe("drive");
  });
});
