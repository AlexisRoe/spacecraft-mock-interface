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

/** Greyscale fills for scatter points, darkest first, indexed by `SensorFieldPoint.shade`. */
const SHADE_COLORS = [
  "var(--color-black)",
  "var(--color-grey-dark)",
  "var(--color-grey-mid)",
  "var(--color-grey-light)",
  "var(--color-grey-lighter)",
];

/**
 * Sensor phase-field plot: a scatter/trace diagram of detected particle and
 * radiation readings — dotted/hatched field boundaries with a solid dense
 * core, a drifting emission stream, a quiet-zone square cluster, and a
 * scan trace — with density spectra along the top and right edges. Fills
 * the available space and scales responsively via its SVG viewBox.
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
          <pattern id="sensor-field-dots" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="0.9" fill="var(--color-grey-light)" />
          </pattern>
          <pattern
            id="sensor-field-hatch-a"
            width="6"
            height="6"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-grey-light)" strokeWidth="1" />
          </pattern>
          <pattern
            id="sensor-field-hatch-b"
            width="4"
            height="4"
            patternTransform="rotate(-45)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="4" stroke="var(--color-grey-dark)" strokeWidth="0.9" />
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
            d="M 250 380 C 240 290 300 215 400 205 C 505 195 590 250 600 340 C 610 430 540 500 440 505 C 330 510 260 470 250 380 Z"
            fill="url(#sensor-field-dots)"
            stroke="var(--color-grey-mid)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path
            d="M 315 372 C 309 316 346 269 408 263 C 473 257 526 291 532 347 C 538 403 494 447 432 450 C 363 453 320 428 315 372 Z"
            fill="url(#sensor-field-hatch-a)"
            fillOpacity="0.55"
            stroke="var(--color-grey-dark)"
            strokeWidth="1.1"
          />
          <path
            d="M 375 365 C 372 337 391 313 422 310 C 454 307 480 324 483 352 C 486 380 464 402 433 404 C 399 405 377 393 375 365 Z"
            fill="var(--color-black)"
            stroke="var(--color-black)"
            strokeWidth="1"
          />

          <path
            d="M 660 400 C 630 330 690 230 780 200 C 850 177 895 210 880 275 C 866 340 800 415 730 430 C 690 438 672 428 660 400 Z"
            fill="none"
            stroke="var(--color-grey-mid)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <path
            d="M 700 380 C 685 335 730 265 795 245 C 840 231 866 252 856 293 C 845 337 800 388 752 400 C 723 407 708 404 700 380 Z"
            fill="url(#sensor-field-hatch-b)"
            fillOpacity="0.5"
            stroke="var(--color-grey-dark)"
            strokeWidth="1.1"
          />

          <path
            d="M 190 545 C 185 510 215 485 255 490 C 292 495 305 525 292 552 C 278 580 240 588 215 575 C 199 566 192 560 190 545 Z"
            fill="var(--color-white)"
            stroke="var(--color-black)"
            strokeWidth="1.1"
          />

          {data.sparsePoints.map((point) => (
            <circle
              key={`sparse-${point.x}-${point.y}`}
              cx={point.x}
              cy={point.y}
              r={point.r}
              fill={SHADE_COLORS[point.shade]}
            />
          ))}
          {data.clusterPoints.map((point) => (
            <circle
              key={`cluster-${point.x}-${point.y}`}
              cx={point.x}
              cy={point.y}
              r={point.r}
              fill={SHADE_COLORS[point.shade]}
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
          {data.squarePoints.map((point) => (
            <rect
              key={`square-${point.x}-${point.y}`}
              x={point.x}
              y={point.y}
              width={point.s}
              height={point.s}
              fill="none"
              stroke="var(--color-grey-dark)"
              strokeWidth="0.9"
            />
          ))}
          <circle cx="248" cy="536" r="3" fill="var(--color-black)" />

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
