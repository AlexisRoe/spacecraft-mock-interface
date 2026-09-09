import { afterEach, describe, expect, it } from "vitest";
import { INITIAL_CHANNELS } from "../utils/comms-channels.util";
import { useCommsConsoleStore } from "./comms-console.store";

describe("useCommsConsoleStore", () => {
  afterEach(() => {
    useCommsConsoleStore.setState({
      channels: INITIAL_CHANNELS,
      selectedChannelIds: [],
      isEncryptionEnabled: false,
    });
  });

  it("starts with the initial channels and no selection", () => {
    const state = useCommsConsoleStore.getState();
    expect(state.channels).toEqual(INITIAL_CHANNELS);
    expect(state.selectedChannelIds).toEqual([]);
  });

  it("toggles a channel's selection on and off", () => {
    const id = INITIAL_CHANNELS[0].id;
    useCommsConsoleStore.getState().toggleChannelSelection(id);
    expect(useCommsConsoleStore.getState().selectedChannelIds).toEqual([id]);

    useCommsConsoleStore.getState().toggleChannelSelection(id);
    expect(useCommsConsoleStore.getState().selectedChannelIds).toEqual([]);
  });

  it("selects and clears every channel", () => {
    useCommsConsoleStore.getState().selectAllChannels();
    expect(useCommsConsoleStore.getState().selectedChannelIds).toEqual(
      INITIAL_CHANNELS.map((channel) => channel.id),
    );

    useCommsConsoleStore.getState().clearSelection();
    expect(useCommsConsoleStore.getState().selectedChannelIds).toEqual([]);
  });

  it("opens and closes the given channels", () => {
    const id = INITIAL_CHANNELS.find((channel) => channel.status === "closed")?.id;
    if (!id) {
      throw new Error("expected an initial closed channel for this test");
    }

    useCommsConsoleStore.getState().openChannels([id]);
    expect(useCommsConsoleStore.getState().channels.find((c) => c.id === id)?.status).toBe("open");

    useCommsConsoleStore.getState().closeChannels([id]);
    expect(useCommsConsoleStore.getState().channels.find((c) => c.id === id)?.status).toBe(
      "closed",
    );
  });

  it("marks opened channels as selected and unselects closed channels", () => {
    const allIds = INITIAL_CHANNELS.map((channel) => channel.id);

    useCommsConsoleStore.getState().openChannels(allIds);
    expect(useCommsConsoleStore.getState().selectedChannelIds.sort()).toEqual([...allIds].sort());
    expect(
      useCommsConsoleStore.getState().channels.every((channel) => channel.status === "open"),
    ).toBe(true);

    useCommsConsoleStore.getState().closeChannels(allIds);
    expect(useCommsConsoleStore.getState().selectedChannelIds).toEqual([]);
    expect(
      useCommsConsoleStore.getState().channels.every((channel) => channel.status === "closed"),
    ).toBe(true);
  });

  it("toggles the encryption flag", () => {
    useCommsConsoleStore.getState().toggleEncryption();
    expect(useCommsConsoleStore.getState().isEncryptionEnabled).toBe(true);

    useCommsConsoleStore.getState().toggleEncryption();
    expect(useCommsConsoleStore.getState().isEncryptionEnabled).toBe(false);
  });
});
