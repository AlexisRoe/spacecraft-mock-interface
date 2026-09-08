import { type JSX, useMemo } from "react";
import { generateSensorFieldData } from "../../utils/sensor-field.util";

import "./sensor-field.component.css";

/** Props for {@link SensorField}. */
export interface SensorFieldProps {
  /** Seed controlling the deterministic scatter/trace/histogram layout. */
  seed?: number;
}

const X_AXIS_LABELS = ["0", "1", "2", "3", "4"];
const Y_AXIS_LABELS = ["0", "1", "2", "3"];

/**
 * Sensor phase-field plot: a scatter/trace diagram of detected particle and
 * radiation readings, with density spectra along the top and right edges.
 * Fills the available space and scales responsively via its SVG viewBox.
 */
export function SensorField({ seed = 7 }: SensorFieldProps): JSX.Element {
  const data = useMemo(() => generateSensorFieldData(seed), [seed]);

  return (
    <div className="sensor-field">
      <svg
        className="sensor-field__svg"
        viewBox="78 36 968 594"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Sensor phase field plot"
      >
        <defs>
          <pattern
            id="sensor-field-grid"
            width="102.5"
            height="83.333"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 102.5 0 L 0 0 0 83.333"
              fill="none"
              stroke="var(--color-grey-lightest)"
              strokeWidth="0.6"
            />
          </pattern>
          <clipPath id="sensor-field-clip">
            <rect x="120" y="90" width="820" height="500" />
          </clipPath>
        </defs>

        <rect x="120" y="90" width="820" height="500" fill="url(#sensor-field-grid)" />
        <rect
          x="120"
          y="90"
          width="820"
          height="500"
          fill="none"
          stroke="var(--color-black)"
          strokeWidth="1.1"
        />

        <g clipPath="url(#sensor-field-clip)">
          <path
            d="M 120 545 L 940 150"
            fill="none"
            stroke="var(--color-grey-lighter)"
            strokeWidth="0.8"
          />

          <path
            d="M 315 372 C 309 316 346 269 408 263 C 473 257 526 291 532 347 C 538 403 494 447 432 450 C 363 453 320 428 315 372 Z"
            fill="none"
            stroke="var(--color-grey-dark)"
            strokeWidth="1.1"
          />
          <path
            d="M 700 380 C 685 335 730 265 795 245 C 840 231 866 252 856 293 C 845 337 800 388 752 400 C 723 407 708 404 700 380 Z"
            fill="none"
            stroke="var(--color-grey-mid)"
            strokeWidth="1.1"
            strokeDasharray="4 4"
          />

          {data.clusterPoints.map((point) => (
            <circle
              key={`cluster-${point.x}-${point.y}`}
              cx={point.x}
              cy={point.y}
              r={point.r}
              fill="var(--color-black)"
            />
          ))}
          {data.streamPoints.map((point) => (
            <circle
              key={`stream-${point.x}-${point.y}`}
              cx={point.x}
              cy={point.y}
              r={point.r}
              fill="none"
              stroke="var(--color-grey-dark)"
              strokeWidth="0.9"
            />
          ))}

          <path d={data.tracePath} fill="none" stroke="var(--color-black)" strokeWidth="1.6" />
          {data.traceNodes.map((node) => (
            <circle
              key={`trace-${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r="3.4"
              fill="var(--color-white)"
              stroke="var(--color-black)"
              strokeWidth="1.4"
            />
          ))}
        </g>

        <g fill="none" stroke="var(--color-black)">
          {X_AXIS_LABELS.map((label, index) => {
            const x = 120 + (index * (940 - 120)) / (X_AXIS_LABELS.length - 1);
            return <line key={label} x1={x} y1="590" x2={x} y2="606" strokeWidth="1.2" />;
          })}
          {Y_AXIS_LABELS.map((label, index) => {
            const y = 590 - (index * (590 - 90)) / (Y_AXIS_LABELS.length - 1);
            return <line key={label} x1="104" y1={y} x2="120" y2={y} strokeWidth="1.2" />;
          })}
        </g>

        <g fontSize="11" fill="var(--color-grey-mid)">
          {X_AXIS_LABELS.map((label, index) => {
            const x = 120 + (index * (940 - 120)) / (X_AXIS_LABELS.length - 1);
            return (
              <text key={label} x={x} y="622" textAnchor="middle">
                {label}
              </text>
            );
          })}
          {Y_AXIS_LABELS.map((label, index) => {
            const y = 590 - (index * (590 - 90)) / (Y_AXIS_LABELS.length - 1) + 4;
            return (
              <text key={label} x="96" y={y} textAnchor="end">
                {label}
              </text>
            );
          })}
        </g>

        <g>
          <line x1="120" y1="82" x2="940" y2="82" stroke="var(--color-black)" strokeWidth="0.9" />
          {data.topBars.map((bar) => {
            const barWidth = (940 - 120) / data.topBars.length;
            return (
              <rect
                key={`top-${bar.position}`}
                x={120 + bar.position * barWidth + 0.6}
                y={82 - bar.size}
                width={barWidth - 1.2}
                height={bar.size}
                fill="var(--color-grey-dark)"
              />
            );
          })}
        </g>

        <g>
          <line x1="956" y1="90" x2="956" y2="590" stroke="var(--color-black)" strokeWidth="0.9" />
          {data.sideBars.map((bar) => {
            const barHeight = (590 - 90) / data.sideBars.length;
            return (
              <rect
                key={`side-${bar.position}`}
                x="960"
                y={90 + bar.position * barHeight + 0.6}
                width={bar.size}
                height={barHeight - 1.2}
                fill="var(--color-grey-dark)"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
