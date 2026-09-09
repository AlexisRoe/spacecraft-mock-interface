import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useWeaponsStore } from "./weapons.store";

const INITIAL = useWeaponsStore.getState();

describe("useWeaponsStore", () => {
  beforeEach(() => {
    act(() => {
      useWeaponsStore.setState({
        targets: INITIAL.targets,
        selectedTargetId: INITIAL.targets[0].id,
        lockStatus: "none",
        lockSecondsRemaining: 0,
        salvoMode: "single",
        weaponStatus: "standby",
        plasmaCannons: INITIAL.plasmaCannons.map((cannon) => ({ ...cannon })),
        torpedoRoundsRemaining: 14,
        torpedoRoundsTotal: 20,
        torpedoTubesLoaded: 2,
        torpedoTubesTotal: 4,
        torpedoReloadSecondsRemaining: 0,
        plasmaFiring: false,
        torpedoFiring: false,
      });
    });
  });

  it("starts with a target selected and no lock", () => {
    const state = useWeaponsStore.getState();
    expect(state.selectedTargetId).toBe("CON 01");
    expect(state.lockStatus).toBe("none");
  });

  it("selecting a different target resets any lock", () => {
    act(() => useWeaponsStore.getState().acquireLock());
    act(() => useWeaponsStore.getState().selectTarget("CON 02"));
    expect(useWeaponsStore.getState().selectedTargetId).toBe("CON 02");
    expect(useWeaponsStore.getState().lockStatus).toBe("none");
  });

  it("acquires a lock over LOCK_DURATION_SECONDS ticks", () => {
    act(() => useWeaponsStore.getState().acquireLock());
    expect(useWeaponsStore.getState().lockStatus).toBe("acquiring");
    expect(useWeaponsStore.getState().lockSecondsRemaining).toBe(2);

    act(() => useWeaponsStore.getState().tickLock());
    expect(useWeaponsStore.getState().lockStatus).toBe("acquiring");

    act(() => useWeaponsStore.getState().tickLock());
    expect(useWeaponsStore.getState().lockStatus).toBe("locked");
  });

  it("does not start acquiring a lock with no target selected", () => {
    act(() => useWeaponsStore.setState({ selectedTargetId: null }));
    act(() => useWeaponsStore.getState().acquireLock());
    expect(useWeaponsStore.getState().lockStatus).toBe("none");
  });

  it("sets salvo mode and weapon status", () => {
    act(() => useWeaponsStore.getState().setSalvoMode("full"));
    expect(useWeaponsStore.getState().salvoMode).toBe("full");

    act(() => useWeaponsStore.getState().setWeaponStatus("battle"));
    expect(useWeaponsStore.getState().weaponStatus).toBe("battle");
  });

  it("refuses to fire a plasma cannon without a lock", () => {
    act(() => useWeaponsStore.getState().firePlasmaCannon("a"));
    expect(useWeaponsStore.getState().plasmaCannons.find((c) => c.id === "a")?.chargePercent).toBe(
      96,
    );
  });

  it("refuses to fire a plasma cannon that isn't ready", () => {
    act(() => useWeaponsStore.getState().acquireLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().firePlasmaCannon("b"));
    expect(useWeaponsStore.getState().plasmaCannons.find((c) => c.id === "b")?.chargePercent).toBe(
      71,
    );
  });

  it("fires a ready, locked plasma cannon, draining its charge and flashing", () => {
    act(() => useWeaponsStore.getState().acquireLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().firePlasmaCannon("a"));
    const state = useWeaponsStore.getState();
    expect(state.plasmaCannons.find((c) => c.id === "a")?.chargePercent).toBe(0);
    expect(state.plasmaCannons.find((c) => c.id === "a")?.status).toBe("charging");
    expect(state.plasmaFiring).toBe(true);
  });

  it("recharges a plasma cannon over successive ticks", () => {
    act(() => useWeaponsStore.getState().acquireLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().firePlasmaCannon("a"));
    act(() => useWeaponsStore.getState().tickCharging());
    expect(
      useWeaponsStore.getState().plasmaCannons.find((c) => c.id === "a")?.chargePercent,
    ).toBeGreaterThan(0);
  });

  it("refuses to fire a torpedo without a lock", () => {
    act(() => useWeaponsStore.getState().fireTorpedo());
    expect(useWeaponsStore.getState().torpedoRoundsRemaining).toBe(14);
  });

  it("launches a torpedo when locked and a tube is loaded, starting reload", () => {
    act(() => useWeaponsStore.getState().acquireLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().fireTorpedo());
    const state = useWeaponsStore.getState();
    expect(state.torpedoRoundsRemaining).toBe(13);
    expect(state.torpedoTubesLoaded).toBe(1);
    expect(state.torpedoReloadSecondsRemaining).toBe(38);
    expect(state.torpedoFiring).toBe(true);
  });

  it("refuses to launch a torpedo with no tube loaded", () => {
    act(() => useWeaponsStore.setState({ torpedoTubesLoaded: 0 }));
    act(() => useWeaponsStore.getState().acquireLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().tickLock());
    act(() => useWeaponsStore.getState().fireTorpedo());
    expect(useWeaponsStore.getState().torpedoRoundsRemaining).toBe(14);
  });
});
