import { useEffect, useState } from "react";

/**
 * Return value of {@link useClock}.
 */
export interface UseClockReturn {
  /** Current wall-clock time, formatted as HH:MM:SS (24-hour). */
  time: string;
  /** Current day of the year (1-366). */
  dayOfYear: number;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-GB", { hour12: false });
}

function getDayOfYear(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const elapsedMs = date.getTime() - startOfYear.getTime();
  return Math.floor(elapsedMs / 86_400_000) + 1;
}

/**
 * Tracks the real, current wall-clock time and day of year, updating once
 * per second, for display as the ship time / mission day readout. Only a
 * tick counter is kept in state (not the `Date` itself) so `new Date()` is
 * always read fresh at render time.
 */
export function useClock(): UseClockReturn {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((tick) => tick + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  return { time: formatTime(now), dayOfYear: getDayOfYear(now) };
}
