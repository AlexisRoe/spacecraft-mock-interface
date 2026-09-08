import { afterEach, describe, expect, it } from "vitest";
import { INITIAL_PROBE_BAYS } from "../utils/probe-deployment.util";
import { useProbeConsoleStore } from "./probe-console.store";

describe("useProbeConsoleStore", () => {
  afterEach(() => {
    useProbeConsoleStore.setState({
      bays: INITIAL_PROBE_BAYS,
      selectedBayId: INITIAL_PROBE_BAYS[0].id,
    });
  });

  it("starts with the initial bays and the first one selected", () => {
    const state = useProbeConsoleStore.getState();
    expect(state.bays).toEqual(INITIAL_PROBE_BAYS);
    expect(state.selectedBayId).toBe(INITIAL_PROBE_BAYS[0].id);
  });

  it("deploys a ready probe", () => {
    const readyBay = INITIAL_PROBE_BAYS.find((bay) => bay.status === "ready");
    if (!readyBay) {
      throw new Error("expected an initial ready bay for this test");
    }
    useProbeConsoleStore.getState().deployProbe(readyBay.id);
    const bay = useProbeConsoleStore.getState().bays.find((entry) => entry.id === readyBay.id);
    expect(bay?.status).toBe("deployed");
  });

  it("destroys (recalls) a deployed probe", () => {
    const deployedBay = INITIAL_PROBE_BAYS.find((bay) => bay.status === "deployed");
    if (!deployedBay) {
      throw new Error("expected an initial deployed bay for this test");
    }
    useProbeConsoleStore.getState().destroyProbe(deployedBay.id);
    const bay = useProbeConsoleStore.getState().bays.find((entry) => entry.id === deployedBay.id);
    expect(bay?.status).toBe("ready");
  });

  it("sets the sweep mode for a bay", () => {
    const bayId = INITIAL_PROBE_BAYS[0].id;
    useProbeConsoleStore.getState().setSweepMode(bayId, "stepped");
    const bay = useProbeConsoleStore.getState().bays.find((entry) => entry.id === bayId);
    expect(bay?.sweepMode).toBe("stepped");
  });
});
