import { afterEach, describe, expect, it } from "vitest";
import { MAX_FREQUENCY_MHZ, MIN_FREQUENCY_MHZ } from "../utils/comms-manual.util";
import { useCommsManualStore } from "./comms-manual.store";

describe("useCommsManualStore", () => {
  afterEach(() => {
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
  });

  it("toggles master audio and the channel open/closed state", () => {
    useCommsManualStore.getState().toggleMasterAudio();
    expect(useCommsManualStore.getState().isMasterAudioOn).toBe(true);

    useCommsManualStore.getState().toggleChannel();
    expect(useCommsManualStore.getState().isChannelOpen).toBe(true);
  });

  it("tunes the frequency and clamps it to the band", () => {
    useCommsManualStore.getState().setFrequency(200);
    expect(useCommsManualStore.getState().frequencyMhz).toBe(200);

    useCommsManualStore.getState().tune(-1000);
    expect(useCommsManualStore.getState().frequencyMhz).toBe(MIN_FREQUENCY_MHZ);

    useCommsManualStore.getState().tune(1000);
    expect(useCommsManualStore.getState().frequencyMhz).toBe(MAX_FREQUENCY_MHZ);
  });

  it("ignores tuning while holding", () => {
    useCommsManualStore.getState().setFrequency(200);
    useCommsManualStore.getState().toggleHold();

    useCommsManualStore.getState().tune(10);
    useCommsManualStore.getState().setFrequency(300);
    useCommsManualStore.getState().scanNext();

    expect(useCommsManualStore.getState().frequencyMhz).toBe(200);
  });

  it("scans to the next external channel frequency and marks scanning active", () => {
    useCommsManualStore.getState().setFrequency(100);
    useCommsManualStore.getState().scanNext();

    const state = useCommsManualStore.getState();
    expect(state.frequencyMhz).toBeGreaterThan(100);
    expect(state.isScanning).toBe(true);

    useCommsManualStore.getState().tune(0.5);
    expect(useCommsManualStore.getState().isScanning).toBe(false);
  });

  it("toggles video and sets the output mode", () => {
    useCommsManualStore.getState().toggleVideo();
    expect(useCommsManualStore.getState().isVideoActive).toBe(true);

    useCommsManualStore.getState().setOutputMode("audio-video");
    expect(useCommsManualStore.getState().outputMode).toBe("audio-video");
  });

  it("toggles a filter's active state", () => {
    useCommsManualStore.getState().toggleFilter("noise-reduction");
    expect(useCommsManualStore.getState().activeFilters).toEqual(["noise-reduction"]);

    useCommsManualStore.getState().toggleFilter("noise-reduction");
    expect(useCommsManualStore.getState().activeFilters).toEqual([]);
  });
});
