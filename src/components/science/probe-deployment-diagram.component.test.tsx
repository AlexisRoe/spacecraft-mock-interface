import { render, screen } from "@testing-library/react";
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

  it("draws a trajectory for all three probes regardless of deployment status", () => {
    const { container } = render(<ProbeDeploymentDiagram />);
    const trajectoryPaths = container.querySelectorAll("path[stroke-width='2']");
    expect(trajectoryPaths.length).toBeGreaterThanOrEqual(INITIAL_PROBE_BAYS.length);
  });
});
