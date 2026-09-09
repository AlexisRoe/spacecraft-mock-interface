import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useCommsManualStore } from "../../stores/comms-manual.store";
import {
  type EnergySystem,
  useEnergyDistributionStore,
} from "../../stores/energy-distribution.store";
import { FrequencyBandDiagram } from "./frequency-band-diagram.component";

const INITIAL_SYSTEMS: EnergySystem[] = useEnergyDistributionStore.getState().systems;

describe("FrequencyBandDiagram", () => {
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

  it("shows comms offline status when comms has no power", () => {
    act(() => {
      useEnergyDistributionStore.setState({
        systems: INITIAL_SYSTEMS.map((system) =>
          system.id === "comms" ? { ...system, percent: 0 } : system,
        ),
      });
    });

    render(<FrequencyBandDiagram />);
    expect(screen.getByText("Comms Offline")).toBeInTheDocument();
  });

  it("shows the tuned frequency and comms online status when comms has power", () => {
    render(<FrequencyBandDiagram />);
    expect(screen.getByText("Comms Online")).toBeInTheDocument();
    expect(screen.getByText("121.500")).toBeInTheDocument();
  });

  it("shows an incoming hail indicator when tuned to a hail frequency with audio and channel on", () => {
    act(() => {
      useCommsManualStore.setState({ isMasterAudioOn: true, isChannelOpen: true });
    });

    render(<FrequencyBandDiagram />);
    expect(screen.getByText("Incoming Hail — 121.500 MHz")).toBeInTheDocument();
  });

  it("does not show an incoming hail indicator when the channel is closed", () => {
    render(<FrequencyBandDiagram />);
    expect(screen.queryByText(/Incoming Hail/)).not.toBeInTheDocument();
  });
});
