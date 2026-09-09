import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useFtlDriveStore } from "../../stores/ftl-drive.store";
import { FtlControlPanel } from "./ftl-control-panel.component";

describe("FtlControlPanel", () => {
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
    });
  });

  it("renders the sliders, geometry options, and readouts", () => {
    render(<FtlControlPanel />);
    expect(screen.getByRole("slider", { name: "Intermix ratio" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Field strength" })).toBeInTheDocument();
    expect(screen.getByText("Symmetric")).toBeInTheDocument();
    expect(screen.getByText("Energy Output")).toBeInTheDocument();
    expect(screen.getByText("Lightspeed Factor")).toBeInTheDocument();
  });

  it("renders the injector rate slider and extra core readouts", () => {
    render(<FtlControlPanel />);
    expect(screen.getByRole("slider", { name: "Antimatter injector rate" })).toBeInTheDocument();
    expect(screen.getByText("Core Temperature")).toBeInTheDocument();
    expect(screen.getByText("Containment Integrity")).toBeInTheDocument();
    expect(screen.getByText("Subspace Distortion")).toBeInTheDocument();
    expect(screen.getByText("Coil Flash Cycles")).toBeInTheDocument();
  });

  it("resets the intermix ratio to balanced via the balance button", () => {
    render(<FtlControlPanel />);
    act(() => useFtlDriveStore.getState().setIntermixRatio(90));
    screen.getByText("Balance").click();
    expect(useFtlDriveStore.getState().intermixRatio).toBe(50);
  });

  it("selects a field geometry on click", () => {
    render(<FtlControlPanel />);
    screen.getByText("Subspace").click();
    expect(useFtlDriveStore.getState().fieldGeometry).toBe("subspace");
  });

  it("nudges the field strength slider with arrow keys", () => {
    render(<FtlControlPanel />);
    screen.getByRole("slider", { name: "Field strength" }).focus();
    act(() => {
      screen
        .getByRole("slider", { name: "Field strength" })
        .dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
    });
    expect(useFtlDriveStore.getState().fieldStrength).toBe(69);
  });
});
