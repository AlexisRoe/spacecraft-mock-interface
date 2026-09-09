import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useCommsConsoleStore } from "../../stores/comms-console.store";
import {
  type EnergySystem,
  useEnergyDistributionStore,
} from "../../stores/energy-distribution.store";
import { INITIAL_CHANNELS } from "../../utils/comms-channels.util";
import { ChannelControlPanel } from "./channel-control-panel.component";

const INITIAL_SYSTEMS: EnergySystem[] = useEnergyDistributionStore.getState().systems;

describe("ChannelControlPanel", () => {
  afterEach(() => {
    act(() => {
      useCommsConsoleStore.setState({
        channels: INITIAL_CHANNELS,
        selectedChannelIds: [],
        isEncryptionEnabled: false,
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

    render(<ChannelControlPanel />);
    expect(screen.getByText("Comms Offline")).toBeInTheDocument();
    expect(screen.getByText("Select All")).toBeDisabled();
    expect(screen.getByText("Open All")).toBeDisabled();
  });

  it("enables the controls when comms has power and opens selected channels", () => {
    render(<ChannelControlPanel />);
    expect(screen.getByText("Comms Online")).toBeInTheDocument();

    act(() => {
      useCommsConsoleStore.getState().toggleChannelSelection(INITIAL_CHANNELS[1].id);
    });

    const openSelected = screen.getByText("Open Selected");
    expect(openSelected).not.toBeDisabled();
    act(() => {
      openSelected.click();
    });

    expect(
      useCommsConsoleStore.getState().channels.find((c) => c.id === INITIAL_CHANNELS[1].id)?.status,
    ).toBe("open");
  });

  it("toggles encryption", () => {
    render(<ChannelControlPanel />);
    const encryptionButton = screen.getByText("Encryption Off");
    act(() => {
      encryptionButton.click();
    });
    expect(screen.getByText("Encryption On")).toBeInTheDocument();
  });
});
