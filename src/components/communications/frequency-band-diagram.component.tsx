import type { JSX, KeyboardEvent, MouseEvent } from "react";
import { useCommsManualStore } from "../../stores/comms-manual.store";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import {
  buildSpectrumCurve,
  computeSignalReading,
  isHailFrequency,
  MAX_FREQUENCY_MHZ,
  MIN_FREQUENCY_MHZ,
  type SpectrumPoint,
} from "../../utils/comms-manual.util";

import "./frequency-band-diagram.component.css";

const BAND_TICKS = [MIN_FREQUENCY_MHZ, 200, 300, 400, MAX_FREQUENCY_MHZ];

/** Width and height of the spectrum diagram's SVG viewBox. */
const CHART_WIDTH = 1000;
const CHART_HEIGHT = 260;

/** Number of samples drawn across the band; more samples read as a smoother curve. */
const SPECTRUM_SAMPLE_COUNT = 90;

const SPECTRUM_CURVE = buildSpectrumCurve(SPECTRUM_SAMPLE_COUNT);

/** Maps a spectrum point to its `{x, y}` position in the chart's viewBox. */
function toChartPoint({ frequencyMhz, amplitudePercent }: SpectrumPoint): { x: number; y: number } {
  const x =
    ((frequencyMhz - MIN_FREQUENCY_MHZ) / (MAX_FREQUENCY_MHZ - MIN_FREQUENCY_MHZ)) * CHART_WIDTH;
  const y = CHART_HEIGHT - (amplitudePercent / 100) * CHART_HEIGHT;
  return { x, y };
}

/**
 * Builds a rounded SVG path through `points` using quadratic Bezier segments
 * between successive midpoints, so the curve reads as a smooth waveform
 * rather than a straight-line polyline.
 */
function buildSmoothPath(points: Array<{ x: number; y: number }>): string {
  if (points.length < 2) return "";

  let path = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    path += ` Q ${points[i].x},${points[i].y} ${midX},${midY}`;
  }
  const last = points[points.length - 1];
  path += ` L ${last.x},${last.y}`;
  return path;
}

const CHART_POINTS = SPECTRUM_CURVE.map(toChartPoint);
const SPECTRUM_LINE_PATH = buildSmoothPath(CHART_POINTS);
const SPECTRUM_AREA_PATH = `${SPECTRUM_LINE_PATH} L ${CHART_WIDTH},${CHART_HEIGHT} L 0,${CHART_HEIGHT} Z`;

/** Formats a frequency in MHz to three decimal places, e.g. "121.500". */
function formatFrequency(mhz: number): string {
  return mhz.toFixed(3);
}

/** A single labelled horizontal meter bar, used for strength/noise/carrier readouts. */
function MeterRow({ label, percent }: { label: string; percent: number }): JSX.Element {
  return (
    <div className="frequency-band-diagram__meter">
      <span className="frequency-band-diagram__meter-label">{label}</span>
      <div className="frequency-band-diagram__meter-track">
        <div className="frequency-band-diagram__meter-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="frequency-band-diagram__meter-value">{percent}%</span>
    </div>
  );
}

/**
 * Right-hand diagram of the Communications view's manual state: a tunable
 * frequency band (click or drag to tune), mocked signal strength/noise/
 * carrier wave meters for the tuned frequency, an incoming-hail indicator,
 * and a status field reporting whether comms has reactor power.
 */
export function FrequencyBandDiagram(): JSX.Element {
  const frequencyMhz = useCommsManualStore((state) => state.frequencyMhz);
  const isChannelOpen = useCommsManualStore((state) => state.isChannelOpen);
  const isMasterAudioOn = useCommsManualStore((state) => state.isMasterAudioOn);
  const isHolding = useCommsManualStore((state) => state.isHolding);
  const activeFilters = useCommsManualStore((state) => state.activeFilters);
  const setFrequency = useCommsManualStore((state) => state.setFrequency);

  const isReactorOnline = useEnergyDistributionStore((state) => state.isReactorOnline);
  const commsPercent =
    useEnergyDistributionStore((state) => state.systems.find((system) => system.id === "comms"))
      ?.percent ?? 0;
  const hasPower = isReactorOnline && commsPercent > 0;

  const reading = computeSignalReading(frequencyMhz, activeFilters);
  const isHailing = hasPower && isMasterAudioOn && isChannelOpen && isHailFrequency(frequencyMhz);
  const markerPercent =
    ((frequencyMhz - MIN_FREQUENCY_MHZ) / (MAX_FREQUENCY_MHZ - MIN_FREQUENCY_MHZ)) * 100;

  function handleSetFromPointer(event: MouseEvent<HTMLDivElement>): void {
    if (!hasPower || isHolding) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const mhz = MIN_FREQUENCY_MHZ + ratio * (MAX_FREQUENCY_MHZ - MIN_FREQUENCY_MHZ);
    setFrequency(Math.round(mhz * 10) / 10);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (!hasPower || isHolding) return;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      setFrequency(frequencyMhz + 0.5);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      setFrequency(frequencyMhz - 0.5);
    }
  }

  return (
    <div className="frequency-band-diagram">
      <div className="frequency-band-diagram__readout">
        <span className="frequency-band-diagram__readout-label">Tuned Frequency</span>
        <span className="frequency-band-diagram__readout-value">
          {formatFrequency(frequencyMhz)}
          <span className="frequency-band-diagram__readout-unit">MHz</span>
        </span>
      </div>

      <div
        className="frequency-band-diagram__band"
        onClick={handleSetFromPointer}
        onKeyDown={handleKeyDown}
        role="slider"
        tabIndex={hasPower && !isHolding ? 0 : -1}
        aria-label="Tuned frequency"
        aria-valuemin={MIN_FREQUENCY_MHZ}
        aria-valuemax={MAX_FREQUENCY_MHZ}
        aria-valuenow={frequencyMhz}
        aria-disabled={!hasPower || isHolding}
      >
        <svg
          className="frequency-band-diagram__chart"
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="Ambient spectrum across the tunable band"
        >
          <defs>
            <pattern
              id="frequency-band-diagram-fill"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <rect width="10" height="10" fill="var(--color-white)" />
              <circle cx="2" cy="2" r="1" fill="var(--color-black)" />
            </pattern>
          </defs>
          <path d={SPECTRUM_AREA_PATH} fill="url(#frequency-band-diagram-fill)" stroke="none" />
          <path
            d={SPECTRUM_LINE_PATH}
            fill="none"
            stroke="var(--color-black)"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <div className="frequency-band-diagram__marker" style={{ left: `${markerPercent}%` }} />
      </div>
      <div className="frequency-band-diagram__ticks">
        {BAND_TICKS.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>

      {isHailing && (
        <div className="frequency-band-diagram__hail">
          Incoming Hail — {formatFrequency(frequencyMhz)} MHz
        </div>
      )}

      <div className="frequency-band-diagram__meters">
        <MeterRow label="Signal Strength" percent={hasPower ? reading.strengthPercent : 0} />
        <MeterRow label="Noise" percent={hasPower ? reading.noisePercent : 0} />
        <MeterRow label="Carrier Wave Strength" percent={hasPower ? reading.carrierPercent : 0} />
      </div>

      <div className="frequency-band-diagram__status">
        <span className="frequency-band-diagram__status-title">
          {hasPower ? "Comms Online" : "Comms Offline"}
        </span>
        <span className="frequency-band-diagram__status-subtitle">
          {hasPower
            ? `${isChannelOpen ? "Channel Open" : "Channel Closed"} · ${
                isMasterAudioOn ? "Audio On" : "Audio Off"
              }`
            : "Allocate reactor power to comms"}
        </span>
      </div>
    </div>
  );
}
