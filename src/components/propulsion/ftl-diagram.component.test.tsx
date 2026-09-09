import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useFtlDriveStore } from "../../stores/ftl-drive.store";
import { useSpacecraftStore } from "../../stores/spacecraft.store";
import { FtlDiagram } from "./ftl-diagram.component";

describe("FtlDiagram", () => {
  afterEach(() => {
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
      useSpacecraftStore.setState({ flightState: "Cruise", velocityC: 0.041 });
    });
    vi.useRealTimers();
  });

  it("renders the schematic and current readouts", () => {
    render(<FtlDiagram />);
    expect(
      screen.getByRole("img", { name: "Matter/antimatter intermix and field coil schematic" }),
    ).toBeInTheDocument();
    expect(screen.getByText("50:50")).toBeInTheDocument();
    expect(screen.getByText("68 cochranes")).toBeInTheDocument();
    expect(screen.getByText("SYMMETRIC")).toBeInTheDocument();
  });

  it("reflects an updated field geometry", () => {
    act(() => useFtlDriveStore.setState({ fieldGeometry: "subspace" }));
    render(<FtlDiagram />);
    expect(screen.getByText("SUBSPACE")).toBeInTheDocument();
  });

  it("renders flash coils above engage FTL, in that order", () => {
    render(<FtlDiagram />);
    const buttons = screen.getAllByRole("button").map((button) => button.textContent);
    expect(buttons).toEqual(["Flash Coils", "Engage FTL"]);
  });

  it("engages the FTL drive and updates the spacecraft flight state and velocity", () => {
    render(<FtlDiagram />);
    act(() => screen.getByText("Engage FTL").click());

    expect(screen.getByText("Disengage FTL")).toBeInTheDocument();
    expect(useSpacecraftStore.getState().flightState).toBe("FTL");
    expect(useSpacecraftStore.getState().velocityC).toBeGreaterThan(0);

    act(() => screen.getByText("Disengage FTL").click());
    expect(screen.getByText("Engage FTL")).toBeInTheDocument();
    expect(useSpacecraftStore.getState().flightState).toBe("Cruise");
    expect(useSpacecraftStore.getState().velocityC).toBeCloseTo(0.041);
  });

  it("runs a coil flash cycle to completion on a timer", () => {
    vi.useFakeTimers();
    render(<FtlDiagram />);
    act(() => screen.getByText("Flash Coils").click());
    expect(screen.getByText("Flashing Coils 3s")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByText("Flash Coils")).toBeInTheDocument();
    expect(useFtlDriveStore.getState().coilFlashCount).toBe(1);
  });
});
