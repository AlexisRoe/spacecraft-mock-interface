import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useProbeConsoleStore } from "../../stores/probe-console.store";
import { INITIAL_PROBE_BAYS } from "../../utils/probe-deployment.util";
import { ProbeDeploymentPanel } from "./probe-deployment-panel.component";

describe("ProbeDeploymentPanel", () => {
  afterEach(() => {
    useProbeConsoleStore.setState({
      bays: INITIAL_PROBE_BAYS,
      selectedBayId: INITIAL_PROBE_BAYS[0].id,
    });
  });

  it("lists all probe bays with their status", () => {
    render(<ProbeDeploymentPanel />);
    expect(screen.getByText("MK II Atmospheric")).toBeInTheDocument();
    expect(screen.getByText("MK IV Field Mapper")).toBeInTheDocument();
    expect(screen.getByText("MK I Deep Sounder")).toBeInTheDocument();
  });

  it("selects a bay by clicking it in the list", () => {
    render(<ProbeDeploymentPanel />);
    fireEvent.click(screen.getByText("MK IV Field Mapper"));
    expect(useProbeConsoleStore.getState().selectedBayId).toBe(INITIAL_PROBE_BAYS[1].id);
  });

  it("deploys the selected bay", () => {
    render(<ProbeDeploymentPanel />);
    fireEvent.click(screen.getByText("MK IV Field Mapper"));
    fireEvent.click(screen.getByRole("button", { name: /Deploy Probe/ }));
    expect(useProbeConsoleStore.getState().bays[1].status).toBe("deployed");
  });

  it("destroys the selected deployed probe", () => {
    render(<ProbeDeploymentPanel />);
    fireEvent.click(screen.getByRole("button", { name: /Destroy Probe/ }));
    expect(useProbeConsoleStore.getState().bays[0].status).toBe("ready");
  });

  it("changes the sweep mode of a deployed probe", () => {
    render(<ProbeDeploymentPanel />);
    fireEvent.click(screen.getByRole("button", { name: "Stepped" }));
    expect(useProbeConsoleStore.getState().bays[0].sweepMode).toBe("stepped");
  });

  it("labels each bay in the list as active or inactive", () => {
    render(<ProbeDeploymentPanel />);
    const inactiveCount = INITIAL_PROBE_BAYS.filter((bay) => bay.status !== "deployed").length;
    const activeCount = INITIAL_PROBE_BAYS.filter((bay) => bay.status === "deployed").length;
    expect(screen.getAllByText("Inactive")).toHaveLength(inactiveCount);
    expect(screen.getAllByText("Active")).toHaveLength(activeCount);
  });

  it("marks the action indicator filled only while the probe is deployed", () => {
    const { container } = render(<ProbeDeploymentPanel />);
    const indicator = container.querySelector(".probe-deployment-panel__action-indicator");
    expect(indicator).toHaveClass("probe-deployment-panel__action-indicator--deployed");

    fireEvent.click(screen.getByRole("button", { name: /Destroy Probe/ }));
    expect(indicator).not.toHaveClass("probe-deployment-panel__action-indicator--deployed");
  });
});
