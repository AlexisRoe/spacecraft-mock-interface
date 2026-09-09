/** Whether a channel reaches outside the ship or stays on the internal comm bus. */
export type ChannelKind = "external" | "internal";

/** Open/closed state of a single channel. */
export type ChannelStatus = "open" | "closed";

/** A single communications channel the officer can open, close, or select. */
export interface CommsChannel {
  /** Stable identifier, e.g. `"fleet-cmd"`. */
  id: string;
  /** Channel label, e.g. `"Fleet Command"`. */
  label: string;
  /** Whether this channel is external (off-ship) or internal (ship-wide). */
  kind: ChannelKind;
  /** Tuned frequency or internal bus code, e.g. `"243.000 MHz"` or `"INT-02"`. */
  frequency: string;
  /** Current open/closed state. */
  status: ChannelStatus;
}

/** Initial mock roster of the ship's external and internal comm channels. */
export const INITIAL_CHANNELS: CommsChannel[] = [
  {
    id: "hailing",
    label: "Hailing Frequency",
    kind: "external",
    frequency: "121.500 MHz",
    status: "open",
  },
  {
    id: "fleet-cmd",
    label: "Fleet Command",
    kind: "external",
    frequency: "243.000 MHz",
    status: "closed",
  },
  {
    id: "planet-ctrl",
    label: "Planetary Control",
    kind: "external",
    frequency: "156.800 MHz",
    status: "closed",
  },
  {
    id: "distress",
    label: "Distress Beacon",
    kind: "external",
    frequency: "406.000 MHz",
    status: "closed",
  },
  {
    id: "docking",
    label: "Docking Control",
    kind: "external",
    frequency: "118.100 MHz",
    status: "closed",
  },
  {
    id: "deep-space",
    label: "Deep Space Relay",
    kind: "external",
    frequency: "8.450 GHz",
    status: "closed",
  },
  { id: "bridge", label: "Bridge", kind: "internal", frequency: "INT-01", status: "open" },
  {
    id: "engineering",
    label: "Engineering",
    kind: "internal",
    frequency: "INT-02",
    status: "open",
  },
  { id: "med-bay", label: "Med Bay", kind: "internal", frequency: "INT-03", status: "closed" },
  {
    id: "quarters",
    label: "Crew Quarters",
    kind: "internal",
    frequency: "INT-04",
    status: "closed",
  },
  {
    id: "shuttle-bay",
    label: "Shuttle Bay",
    kind: "internal",
    frequency: "INT-05",
    status: "closed",
  },
  { id: "all-hands", label: "All-Hands", kind: "internal", frequency: "INT-00", status: "closed" },
  {
    id: "diplomatic",
    label: "Diplomatic Corps",
    kind: "external",
    frequency: "312.250 MHz",
    status: "closed",
  },
  {
    id: "cargo-hold",
    label: "Cargo Hold",
    kind: "internal",
    frequency: "INT-06",
    status: "closed",
  },
  {
    id: "science-bay",
    label: "Science Bay",
    kind: "internal",
    frequency: "INT-07",
    status: "closed",
  },
];
