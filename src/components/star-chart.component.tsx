import { type JSX, useEffect, useRef, useState } from "react";

import "./star-chart.component.css";

/** A named star/system marker plotted on the {@link StarChart}. */
export interface StarChartWaypoint {
  /** Display name of the system, e.g. "GLIESE 581". */
  name: string;
  /** Horizontal position as a percentage (0-100) of the chart width. */
  xPct: number;
  /** Vertical position as a percentage (0-100) of the chart height. */
  yPct: number;
}

/** Props for {@link StarChart}. */
export interface StarChartProps {
  /** Caption rendered in the top-left corner, e.g. the galactic sector. */
  caption: string;
  /** Named waypoints to plot on the chart. */
  waypoints: StarChartWaypoint[];
  /** Index into `waypoints` of the currently targeted system. */
  activeIndex: number;
}

const SHIP_POSITION = { xPct: 17, yPct: 58 };

const BACKGROUND_STARS = [
  { xPct: 9, yPct: 28 },
  { xPct: 27, yPct: 38 },
  { xPct: 33, yPct: 60 },
  { xPct: 45, yPct: 50 },
  { xPct: 40, yPct: 68 },
  { xPct: 62, yPct: 32 },
  { xPct: 73, yPct: 35 },
  { xPct: 61, yPct: 74 },
  { xPct: 88, yPct: 52 },
];

/**
 * Galactic star chart plotting the ship and known waypoints on a grid,
 * with a dashed course line drawn from the ship to the active target.
 */
export function StarChart({ caption, waypoints, activeIndex }: StarChartProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const target = waypoints[activeIndex];
  const dxPx = ((target.xPct - SHIP_POSITION.xPct) / 100) * size.width;
  const dyPx = ((target.yPct - SHIP_POSITION.yPct) / 100) * size.height;
  const courseLengthPx = Math.hypot(dxPx, dyPx);
  const courseAngleDeg = (Math.atan2(dyPx, dxPx) * 180) / Math.PI;

  return (
    <div className="star-chart" ref={containerRef}>
      <span className="star-chart__caption">{caption}</span>

      <div
        className="star-chart__course"
        style={{
          left: `${SHIP_POSITION.xPct}%`,
          top: `${SHIP_POSITION.yPct}%`,
          width: `${courseLengthPx}px`,
          transform: `rotate(${courseAngleDeg}deg)`,
        }}
      />

      <div
        className="star-chart__target-ring"
        style={{ left: `${target.xPct}%`, top: `${target.yPct}%` }}
      />

      {BACKGROUND_STARS.map((star) => (
        <div
          key={`${star.xPct}-${star.yPct}`}
          className="star-chart__dust"
          style={{ left: `${star.xPct}%`, top: `${star.yPct}%` }}
        />
      ))}

      {waypoints.map((waypoint, index) => (
        <div
          key={waypoint.name}
          className="star-chart__marker"
          style={{ left: `${waypoint.xPct}%`, top: `${waypoint.yPct}%` }}
        >
          <span className="star-chart__marker-dot" />
          <span
            className={[
              "star-chart__marker-label",
              index === activeIndex && "star-chart__marker-label--active",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {waypoint.name}
          </span>
        </div>
      ))}

      <div
        className="star-chart__ship"
        style={{ left: `${SHIP_POSITION.xPct}%`, top: `${SHIP_POSITION.yPct}%` }}
      >
        <span className="star-chart__ship-marker" />
        <span className="star-chart__ship-label">◄ SHIP</span>
      </div>
    </div>
  );
}
