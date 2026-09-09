import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useWeaponsStore } from "../../stores/weapons.store";
import { TargetingMap } from "./targeting-map.component";

const INITIAL = useWeaponsStore.getState();

describe("TargetingMap", () => {
  afterEach(() => {
    act(() => {
      useWeaponsStore.setState({
        ...INITIAL,
        plasmaCannons: INITIAL.plasmaCannons.map((cannon) => ({ ...cannon })),
      });
    });
  });

  it("shows the three preset contacts and the initially selected target", () => {
    render(<TargetingMap />);
    expect(screen.getByText("CON 01")).toBeInTheDocument();
    expect(screen.getByText("CON 02")).toBeInTheDocument();
    expect(screen.getByText("CON 03")).toBeInTheDocument();
    expect(screen.getAllByText("ISV Kestrel").length).toBeGreaterThan(0);
  });

  it("selects a different contact when its card is clicked", () => {
    render(<TargetingMap />);
    act(() => screen.getByRole("button", { name: /CON 02/ }).click());
    expect(useWeaponsStore.getState().selectedTargetId).toBe("CON 02");
  });

  it("shows tracking-only until a lock is acquired", () => {
    render(<TargetingMap />);
    expect(screen.getByText("Tracking Only")).toBeInTheDocument();
    act(() => useWeaponsStore.getState().acquireLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().tickLock());
    expect(useWeaponsStore.getState().lockStatus).toBe("locked");
  });
});
