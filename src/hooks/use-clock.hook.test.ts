import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useClock } from "./use-clock.hook";

describe("useClock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 7, 14, 7, 32));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("reports the current time formatted as HH:MM:SS", () => {
    const { result } = renderHook(() => useClock());
    expect(result.current.time).toBe("14:07:32");
  });

  it("reports the current day of the year", () => {
    const { result } = renderHook(() => useClock());
    expect(result.current.dayOfYear).toBe(250);
  });

  it("updates once per second", () => {
    const { result } = renderHook(() => useClock());

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.time).toBe("14:07:33");
  });
});
