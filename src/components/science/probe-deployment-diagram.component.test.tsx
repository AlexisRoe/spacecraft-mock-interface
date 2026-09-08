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

  it("draws a marker and trajectory only for deployed bays", () => {
    const deployedCount = INITIAL_PROBE_BAYS.filter((bay) => bay.status === "deployed").length;
    const { container } = render(<ProbeDeploymentDiagram />);
    expect(container.querySelectorAll(".probe-deployment-diagram__trajectory").length).toBe(
      deployedCount,
    );
    expect(container.querySelectorAll(".probe-deployment-diagram__marker--deployed").length).toBe(
      deployedCount,
    );
  });

  it("makes a probe appear on deploy and disappear on destroy", () => {
    const readyBay = INITIAL_PROBE_BAYS.find((bay) => bay.status === "ready");
    if (!readyBay) {
      throw new Error("expected an initial ready bay for this test");
    }
    const deployedCount = INITIAL_PROBE_BAYS.filter((bay) => bay.status === "deployed").length;
    const { container } = render(<ProbeDeploymentDiagram />);
    expect(container.querySelectorAll(".probe-deployment-diagram__trajectory").length).toBe(
      deployedCount,
    );

    act(() => {
      useProbeConsoleStore.getState().deployProbe(readyBay.id);
    });
    expect(container.querySelectorAll(".probe-deployment-diagram__trajectory").length).toBe(
      deployedCount + 1,
    );

    act(() => {
      useProbeConsoleStore.getState().destroyProbe(readyBay.id);
    });
    expect(container.querySelectorAll(".probe-deployment-diagram__trajectory").length).toBe(
      deployedCount,
    );
  });
});
