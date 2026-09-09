import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useFtlDriveStore } from "./ftl-drive.store";

describe("useFtlDriveStore", () => {
  beforeEach(() => {
    act(() => {
      useFtlDriveStore.setState({
        intermixRatio: 50,
        fieldStrength: 68,
        fieldGeometry: "symmetric",
        flashingCoils: false,
        coilFlashSeconds: 0,
        coilFlashCount: 0,
        ftlEngaged: false,
        injectorRate: 50,
      });
    });
  });

  it("clamps the intermix ratio to 0-100", () => {
    act(() => useFtlDriveStore.getState().setIntermixRatio(140));
    expect(useFtlDriveStore.getState().intermixRatio).toBe(100);

    act(() => useFtlDriveStore.getState().setIntermixRatio(-20));
    expect(useFtlDriveStore.getState().intermixRatio).toBe(0);
  });

  it("resets the intermix ratio to a balanced mix", () => {
    act(() => useFtlDriveStore.getState().setIntermixRatio(90));
    act(() => useFtlDriveStore.getState().balanceIntermix());
    expect(useFtlDriveStore.getState().intermixRatio).toBe(50);
  });

  it("clamps the injector rate to 0-100", () => {
    act(() => useFtlDriveStore.getState().setInjectorRate(140));
    expect(useFtlDriveStore.getState().injectorRate).toBe(100);

    act(() => useFtlDriveStore.getState().setInjectorRate(-20));
    expect(useFtlDriveStore.getState().injectorRate).toBe(0);
  });

  it("clamps the field strength to 0-100", () => {
    act(() => useFtlDriveStore.getState().setFieldStrength(150));
    expect(useFtlDriveStore.getState().fieldStrength).toBe(100);
  });

  it("sets the field geometry", () => {
    act(() => useFtlDriveStore.getState().setFieldGeometry("subspace"));
    expect(useFtlDriveStore.getState().fieldGeometry).toBe("subspace");
  });

  it("runs a coil flash cycle down to completion", () => {
    act(() => useFtlDriveStore.getState().startFlashCoils());
    expect(useFtlDriveStore.getState().flashingCoils).toBe(true);
    expect(useFtlDriveStore.getState().coilFlashSeconds).toBe(3);

    act(() => useFtlDriveStore.getState().tickCoilFlash());
    act(() => useFtlDriveStore.getState().tickCoilFlash());
    expect(useFtlDriveStore.getState().flashingCoils).toBe(true);
    expect(useFtlDriveStore.getState().coilFlashSeconds).toBe(1);

    act(() => useFtlDriveStore.getState().tickCoilFlash());
    expect(useFtlDriveStore.getState().flashingCoils).toBe(false);
    expect(useFtlDriveStore.getState().coilFlashSeconds).toBe(0);
    expect(useFtlDriveStore.getState().coilFlashCount).toBe(1);
  });

  it("toggles the FTL engaged flag", () => {
    act(() => useFtlDriveStore.getState().toggleFtlEngaged());
    expect(useFtlDriveStore.getState().ftlEngaged).toBe(true);

    act(() => useFtlDriveStore.getState().toggleFtlEngaged());
    expect(useFtlDriveStore.getState().ftlEngaged).toBe(false);
  });

  it("ignores a flash start while one is already running", () => {
    act(() => useFtlDriveStore.getState().startFlashCoils());
    act(() => useFtlDriveStore.getState().tickCoilFlash());
    act(() => useFtlDriveStore.getState().startFlashCoils());
    expect(useFtlDriveStore.getState().coilFlashSeconds).toBe(2);
  });
});
