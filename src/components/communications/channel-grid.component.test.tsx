import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useCommsConsoleStore } from "../../stores/comms-console.store";
import { INITIAL_CHANNELS } from "../../utils/comms-channels.util";
import { ChannelGrid } from "./channel-grid.component";

describe("ChannelGrid", () => {
  afterEach(() => {
    act(() => {
      useCommsConsoleStore.setState({ channels: INITIAL_CHANNELS, selectedChannelIds: [] });
    });
  });

  it("renders every channel", () => {
    render(<ChannelGrid />);
    for (const channel of INITIAL_CHANNELS) {
      expect(screen.getByText(channel.label)).toBeInTheDocument();
    }
  });

  it("toggles a channel's selection when clicked", () => {
    render(<ChannelGrid />);
    const tile = screen.getByText(INITIAL_CHANNELS[0].label).closest("button");
    if (!tile) {
      throw new Error("expected the channel tile to be a button");
    }

    expect(tile).toHaveAttribute("aria-pressed", "false");
    act(() => {
      tile.click();
    });
    expect(tile).toHaveAttribute("aria-pressed", "true");
    expect(useCommsConsoleStore.getState().selectedChannelIds).toEqual([INITIAL_CHANNELS[0].id]);
  });
});
