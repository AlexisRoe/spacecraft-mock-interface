import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useShieldsStore } from "./shields.store";

const INITIAL_QUADRANTS = useShieldsStore.getState().quadrants;

function totalPercent(): number {
  return useShieldsStore.getState().quadrants.reduce((sum, quadrant) => sum + quadrant.percent, 0);
}

describe("useShieldsStore", () => {
  beforeEach(() => {
    act(() => {
      useShieldsStore.setState({
        quadrants: INITIAL_QUADRANTS,
        raised: false,
        regenerating: false,
        regenSecondsRemaining: 0,
      });
    });
  });

  it("starts with all four quadrants active and allocations summing to 100", () => {
    const { quadrants } = useShieldsStore.getState();
    expect(quadrants).toHaveLength(4);
    expect(quadrants.every((quadrant) => quadrant.active)).toBe(true);
    expect(totalPercent()).toBe(100);
  });

  it("sets the target quadrant's allocation and keeps the total at 100", () => {
    act(() => useShieldsStore.getState().setAllocation("fore", 70));
    const { quadrants } = useShieldsStore.getState();
    expect(quadrants.find((quadrant) => quadrant.id === "fore")?.percent).toBe(70);
    expect(totalPercent()).toBe(100);
  });

  it("clamps the target allocation to 0-100", () => {
    act(() => useShieldsStore.getState().setAllocation("aft", 150));
    expect(
      useShieldsStore.getState().quadrants.find((quadrant) => quadrant.id === "aft")?.percent,
    ).toBe(100);
    expect(totalPercent()).toBe(100);
  });

  it("ignores allocation changes to an inactive quadrant", () => {
    act(() => useShieldsStore.getState().toggleActive("fore"));
    act(() => useShieldsStore.getState().setAllocation("fore", 80));
    expect(
      useShieldsStore.getState().quadrants.find((quadrant) => quadrant.id === "fore")?.percent,
    ).toBe(0);
  });

  it("redistributes a deactivated quadrant's share evenly to the remaining active quadrants", () => {
    act(() => useShieldsStore.getState().toggleActive("fore"));
    const { quadrants } = useShieldsStore.getState();
    expect(quadrants.find((quadrant) => quadrant.id === "fore")?.active).toBe(false);
    expect(quadrants.find((quadrant) => quadrant.id === "fore")?.percent).toBe(0);
    const others = quadrants.filter((quadrant) => quadrant.id !== "fore");
    expect(others.every((quadrant) => quadrant.percent === 34 || quadrant.percent === 33)).toBe(
      true,
    );
    expect(totalPercent()).toBe(100);
  });

  it("re-splits the grid evenly across active quadrants when one is reactivated", () => {
    act(() => useShieldsStore.getState().toggleActive("fore"));
    act(() => useShieldsStore.getState().toggleActive("fore"));
    const { quadrants } = useShieldsStore.getState();
    expect(quadrants.find((quadrant) => quadrant.id === "fore")?.active).toBe(true);
    expect(totalPercent()).toBe(100);
    expect(quadrants.every((quadrant) => quadrant.percent === 25)).toBe(true);
  });

  it("re-splits energy evenly across active quadrants on demand", () => {
    act(() => useShieldsStore.getState().setAllocation("fore", 70));
    act(() => useShieldsStore.getState().distributeEvenly());
    expect(useShieldsStore.getState().quadrants.every((quadrant) => quadrant.percent === 25)).toBe(
      true,
    );
    expect(totalPercent()).toBe(100);
  });

  it("raises and lowers the shield grid", () => {
    act(() => useShieldsStore.getState().raiseShields());
    expect(useShieldsStore.getState().raised).toBe(true);

    act(() => useShieldsStore.getState().lowerShields());
    expect(useShieldsStore.getState().raised).toBe(false);
  });

  it("runs a regeneration cycle down to completion, re-splitting energy evenly across active quadrants", () => {
    act(() => useShieldsStore.getState().setAllocation("fore", 70));

    act(() => useShieldsStore.getState().regenerateShields());
    expect(useShieldsStore.getState().regenerating).toBe(true);
    expect(useShieldsStore.getState().regenSecondsRemaining).toBe(3);

    act(() => useShieldsStore.getState().tickRegeneration());
    act(() => useShieldsStore.getState().tickRegeneration());
    expect(useShieldsStore.getState().regenerating).toBe(true);

    act(() => useShieldsStore.getState().tickRegeneration());
    expect(useShieldsStore.getState().regenerating).toBe(false);
    expect(useShieldsStore.getState().quadrants.every((quadrant) => quadrant.percent === 25)).toBe(
      true,
    );
  });

  it("ignores a regeneration start while one is already running", () => {
    act(() => useShieldsStore.getState().regenerateShields());
    act(() => useShieldsStore.getState().tickRegeneration());
    act(() => useShieldsStore.getState().regenerateShields());
    expect(useShieldsStore.getState().regenSecondsRemaining).toBe(2);
  });
});
