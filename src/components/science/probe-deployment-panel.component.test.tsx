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

  it("does not react to clicking a bay in the list", () => {
    render(<ProbeDeploymentPanel />);
    fireEvent.click(screen.getByText("MK IV Field Mapper"));
    expect(useProbeConsoleStore.getState().selectedBayId).toBe(INITIAL_PROBE_BAYS[0].id);
  });

  it("deploys the fixed control bay", () => {
    useProbeConsoleStore.setState({
      bays: INITIAL_PROBE_BAYS,
      selectedBayId: INITIAL_PROBE_BAYS[1].id,
    });
    render(<ProbeDeploymentPanel />);
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
});
