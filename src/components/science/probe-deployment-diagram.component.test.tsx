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

  it("adds a bold ring marker and removes the probe entirely once destroyed", () => {
    const deployedBay = INITIAL_PROBE_BAYS.find((bay) => bay.status === "deployed");
    if (!deployedBay) {
      throw new Error("expected an initial deployed bay for this test");
    }
    const deployedCount = INITIAL_PROBE_BAYS.filter((bay) => bay.status === "deployed").length;
    const { container } = render(<ProbeDeploymentDiagram />);
    expect(container.querySelectorAll("circle[stroke-width='4']").length).toBe(deployedCount);

    act(() => {
      useProbeConsoleStore.getState().destroyProbe(deployedBay.id);
    });
    expect(container.querySelectorAll("circle[stroke-width='4']").length).toBe(deployedCount - 1);
  });
});
