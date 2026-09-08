import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useProbeConsoleStore } from "../../stores/probe-console.store";
import { INITIAL_PROBE_BAYS } from "../../utils/probe-deployment.util";
import { ProbeDeploymentDiagram } from "./probe-deployment-diagram.component";

describe("ProbeDeploymentDiagram", () => {
  afterEach(() => {
    useProbeConsoleStore.setState({
      bays: INITIAL_PROBE_BAYS,
      selectedBayId: INITIAL_PROBE_BAYS[0].id,
    });
  });

  it("renders the diagram", () => {
    render(<ProbeDeploymentDiagram />);
    expect(screen.getByLabelText("Probe deployment diagram")).toBeInTheDocument();
  });

  it("draws a trajectory only for deployed probes", () => {
    const deployedCount = INITIAL_PROBE_BAYS.filter((bay) => bay.status === "deployed").length;
    const { container } = render(<ProbeDeploymentDiagram />);
    const trajectoryPaths = container.querySelectorAll(".probe-deployment-diagram__trajectory");
    expect(trajectoryPaths.length).toBe(deployedCount);
  });

  it("always shows a target marker for all three probe bays", () => {
    const { container } = render(<ProbeDeploymentDiagram />);
    const deployedMarkers = container.querySelectorAll(
      ".probe-deployment-diagram__marker--deployed",
    );
    const readyMarkers = container.querySelectorAll(".probe-deployment-diagram__marker--ready");
    expect(deployedMarkers.length + readyMarkers.length).toBe(INITIAL_PROBE_BAYS.length);
  });

  it("switches a bay's marker to the bold-ringed deployed symbol once released", () => {
    const readyBay = INITIAL_PROBE_BAYS.find((bay) => bay.status === "ready");
    if (!readyBay) {
      throw new Error("expected an initial ready bay for this test");
    }
    const deployedCount = INITIAL_PROBE_BAYS.filter((bay) => bay.status === "deployed").length;
    const { container } = render(<ProbeDeploymentDiagram />);
    expect(container.querySelectorAll("circle[stroke-width='4']").length).toBe(deployedCount);

    act(() => {
      useProbeConsoleStore.getState().deployProbe(readyBay.id);
    });
    expect(container.querySelectorAll("circle[stroke-width='4']").length).toBe(deployedCount + 1);
    expect(container.querySelectorAll(".probe-deployment-diagram__marker--ready").length).toBe(
      INITIAL_PROBE_BAYS.length - deployedCount - 1,
    );
  });
});
