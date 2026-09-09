import { create } from "zustand";
import { type CommsChannel, INITIAL_CHANNELS } from "../utils/comms-channels.util";

/** Shape of the Communications console state and the actions available to mutate it. */
export interface CommsConsoleState {
  /** All external and internal comm channels and their current open/closed state. */
  channels: CommsChannel[];
  /** Ids of the channels currently selected in the grid, for the control panel to act on. */
  selectedChannelIds: string[];
  /** Whether outgoing traffic on selected/opened channels is flagged as encrypted. */
  isEncryptionEnabled: boolean;
  /** Toggles `id`'s membership in the current selection. */
  toggleChannelSelection: (id: string) => void;
  /** Selects every channel. */
  selectAllChannels: () => void;
  /** Clears the current selection. */
  clearSelection: () => void;
  /** Opens every channel in `ids` and marks them selected. */
  openChannels: (ids: string[]) => void;
  /** Closes every channel in `ids` and clears them from the selection. */
  closeChannels: (ids: string[]) => void;
  /** Flips whether outgoing traffic is flagged as encrypted. */
  toggleEncryption: () => void;
}

/** Global store holding the Communications view's channel roster and controls. */
export const useCommsConsoleStore = create<CommsConsoleState>((set) => ({
  channels: INITIAL_CHANNELS,
  selectedChannelIds: [],
  isEncryptionEnabled: false,
  toggleChannelSelection: (id) =>
    set((state) => ({
      selectedChannelIds: state.selectedChannelIds.includes(id)
        ? state.selectedChannelIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedChannelIds, id],
    })),
  selectAllChannels: () =>
    set((state) => ({ selectedChannelIds: state.channels.map((channel) => channel.id) })),
  clearSelection: () => set({ selectedChannelIds: [] }),
  openChannels: (ids) =>
    set((state) => ({
      channels: state.channels.map((channel) =>
        ids.includes(channel.id) ? { ...channel, status: "open" } : channel,
      ),
      selectedChannelIds: Array.from(new Set([...state.selectedChannelIds, ...ids])),
    })),
  closeChannels: (ids) =>
    set((state) => ({
      channels: state.channels.map((channel) =>
        ids.includes(channel.id) ? { ...channel, status: "closed" } : channel,
      ),
      selectedChannelIds: state.selectedChannelIds.filter(
        (selectedId) => !ids.includes(selectedId),
      ),
    })),
  toggleEncryption: () => set((state) => ({ isEncryptionEnabled: !state.isEncryptionEnabled })),
}));
