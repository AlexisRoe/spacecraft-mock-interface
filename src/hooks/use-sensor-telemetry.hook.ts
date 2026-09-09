import { useEffect, useState } from "react";
import type { SensorReadoutProps } from "../components/science/sensor-readout.component";
import { jitterValue } from "../utils/jitter-value.util";

const UPDATE_INTERVAL_MS = 1500;

/**
 * Drifts each readout's `value` by a small random amount, simulating live
 * sensor noise while keeping titles, units, and subtitles fixed.
 */
function driftReadouts(readouts: SensorReadoutProps[]): SensorReadoutProps[] {
  return readouts.map((readout) => ({ ...readout, value: jitterValue(readout.value) }));
}

/**
 * Takes a set of baseline sensor readouts and returns a copy whose values
 * drift by a small random amount every 1.5 seconds, so the science console
 * sensor tiles read as live telemetry rather than a static mock.
 */
export function useSensorTelemetry(baseReadouts: SensorReadoutProps[]): SensorReadoutProps[] {
  const [readouts, setReadouts] = useState(baseReadouts);

  useEffect(() => {
    setReadouts(baseReadouts);
    const interval = setInterval(() => {
      setReadouts((current) => driftReadouts(current));
    }, UPDATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [baseReadouts]);

  return readouts;
}
