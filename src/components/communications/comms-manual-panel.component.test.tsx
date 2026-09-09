import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useCommsManualStore } from "../../stores/comms-manual.store";
import {
  type EnergySystem,
  useEnergyDistributionStore,
} from "../../stores/energy-distribution.store";
import { CommsManualPanel } from "./comms-manual-panel.component";

const INITIAL_SYSTEMS: EnergySystem[] = useEnergyDistributionStore.getState().systems;

describe("CommsManualPanel", () => {
  afterEach(() => {
    act(() => {
      useCommsManualStore.setState({
        isMasterAudioOn: false,
        isChannelOpen: false,
        frequencyMhz: 121.5,
        isScanning: false,
        isHolding: false,
        isVideoActive: false,
        outputMode: "audio",
        activeFilters: [],
      });
      useEnergyDistributionStore.setState({ systems: INITIAL_SYSTEMS, isReactorOnline: true });
    });
  });

  it("disables the controls when comms has no power", () => {
    act(() => {
      useEnergyDistributionStore.setState({
        systems: INITIAL_SYSTEMS.map((system) =>
          system.id === "comms" ? { ...system, percent: 0 } : system,
        ),
      });
    });

    render(<CommsManualPanel />);
    expect(screen.getByText("Master Audio")).toBeDisabled();
    expect(screen.getByText("Tune Up")).toBeDisabled();
  });

  it("toggles master audio and channel open/closed when comms has power", () => {
    render(<CommsManualPanel />);

    const masterAudio = screen.getByText("Master Audio");
    expect(masterAudio).not.toBeDisabled();
    act(() => masterAudio.click());
    expect(useCommsManualStore.getState().isMasterAudioOn).toBe(true);

    const openChannel = screen.getByText("Open Channel");
    act(() => openChannel.click());
    expect(useCommsManualStore.getState().isChannelOpen).toBe(true);
    expect(screen.getByText("Close Channel")).toBeInTheDocument();
  });

  it("scans to the next frequency and disables tuning while holding", () => {
    render(<CommsManualPanel />);

    act(() => screen.getByText("Scan").click());
    expect(useCommsManualStore.getState().isScanning).toBe(true);

    act(() => screen.getByText("Hold").click());
    expect(screen.getByText("Tune Up")).toBeDisabled();
    expect(screen.getByText("Scan")).toBeDisabled();
  });

  it("only enables output mode buttons once video is active", () => {
    render(<CommsManualPanel />);

    expect(screen.getByText("Audio + Video")).toBeDisabled();

    act(() => screen.getByText("Activate Video").click());
    expect(useCommsManualStore.getState().isVideoActive).toBe(true);
    expect(screen.getByText("Audio + Video")).not.toBeDisabled();

    act(() => screen.getByText("Audio + Video").click());
    expect(useCommsManualStore.getState().outputMode).toBe("audio-video");
  });

  it("toggles a filter", () => {
    render(<CommsManualPanel />);
    act(() => screen.getByText("Noise Reduction").click());
    expect(useCommsManualStore.getState().activeFilters).toEqual(["noise-reduction"]);
  });
});
