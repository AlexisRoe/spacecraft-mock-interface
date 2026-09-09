import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SensorReadoutProps } from "../components/science/sensor-readout.component";
import { useSensorTelemetry } from "./use-sensor-telemetry.hook";

const BASE_READOUTS: SensorReadoutProps[] = [
  { value: "412", unit: "km/s", title: "Solar Wind Vane", subtitle: "Quiet sector" },
];

describe("useSensorTelemetry", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the baseline readouts before any tick elapses", () => {
    const { result } = renderHook(() => useSensorTelemetry(BASE_READOUTS));
    expect(result.current).toEqual(BASE_READOUTS);
  });

  it("keeps titles, units, and subtitles unchanged after drifting", () => {
    const { result } = renderHook(() => useSensorTelemetry(BASE_READOUTS));

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current[0].title).toBe("Solar Wind Vane");
    expect(result.current[0].unit).toBe("km/s");
    expect(result.current[0].subtitle).toBe("Quiet sector");
  });

  it("does not mutate the value before 1.5 seconds have elapsed", () => {
    const { result } = renderHook(() => useSensorTelemetry(BASE_READOUTS));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0].value).toBe("412");
  });

  it("resets to the new baseline when the input readouts change", () => {
    const { result, rerender } = renderHook(({ readouts }) => useSensorTelemetry(readouts), {
      initialProps: { readouts: BASE_READOUTS },
    });

    const nextReadouts: SensorReadoutProps[] = [
      { value: "99", unit: "km/s", title: "Solar Wind Vane", subtitle: "Quiet sector" },
    ];
    rerender({ readouts: nextReadouts });

    expect(result.current).toEqual(nextReadouts);
  });
});
