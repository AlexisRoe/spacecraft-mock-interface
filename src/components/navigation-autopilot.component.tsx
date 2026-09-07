import { type JSX, useState } from "react";
import { GyroCompass } from "./gyro-compass.component";
import { StarChart } from "./star-chart.component";
import { StatDisplay } from "./stat-display.component";

import "./navigation-autopilot.component.css";

/** Attitude command shown as a switch on the last row of {@link NavigationAutopilotLeft}. */
type AttitudeCommand = "HOLD" | "ALIGN COURSE" | "RETROGRADE" | "FREE";

const ATTITUDE_COMMANDS: AttitudeCommand[] = ["HOLD", "ALIGN COURSE", "RETROGRADE", "FREE"];

/** Gyro/attitude readout driven by the currently selected {@link AttitudeCommand}. */
interface AttitudeReadout {
  /** Needle angle on the gyro dial, in degrees from North. */
  angleDeg: number;
  /** Compass heading, e.g. "214.6°". */
  heading: string;
  /** Pitch angle, e.g. "+02.4°". */
  pitch: string;
  /** Roll angle, e.g. "00.0°". */
  roll: string;
  /** RCS (reaction control system) arming state. */
  rcs: string;
  /** Gyro drift rate. */
  drift: string;
  /** Spin/nutation damping state. */
  spin: string;
}

const ATTITUDE_READOUTS: Record<AttitudeCommand, AttitudeReadout> = {
  HOLD: {
    angleDeg: -34,
    heading: "214.6°",
    pitch: "+02.4°",
    roll: "00.0°",
    rcs: "ARMED",
    drift: "0.002°/h",
    spin: "NULLED",
  },
  "ALIGN COURSE": {
    angleDeg: 42,
    heading: "058.2°",
    pitch: "+00.6°",
    roll: "00.0°",
    rcs: "ARMED",
    drift: "0.004°/h",
    spin: "NULLED",
  },
  RETROGRADE: {
    angleDeg: 180,
    heading: "034.6°",
    pitch: "−01.8°",
    roll: "00.0°",
    rcs: "ARMED",
    drift: "0.006°/h",
    spin: "DAMPING",
  },
  FREE: {
    angleDeg: -34,
    heading: "214.6°",
    pitch: "+02.4°",
    roll: "00.0°",
    rcs: "ARMED",
    drift: "0.002°/h",
    spin: "NULLED",
  },
};

/** Left column content for the navigation view in autopilot mode: attitude gyro and commands. */
export function NavigationAutopilotLeft(): JSX.Element {
  const [activeCommand, setActiveCommand] = useState<AttitudeCommand>("FREE");
  const readout = ATTITUDE_READOUTS[activeCommand];

  return (
    <div className="navigation-autopilot-left">
      <div className="navigation-autopilot__row navigation-autopilot__row--primary">
        <GyroCompass angleDeg={readout.angleDeg} caption="BEARING / ELEVATION · GYRO A LOCKED" />
      </div>
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-3">
        <div className="navigation-autopilot__cell">
          <StatDisplay label="Heading" value={readout.heading} />
        </div>
        <div className="navigation-autopilot__cell">
          <StatDisplay label="Pitch" value={readout.pitch} />
        </div>
        <div className="navigation-autopilot__cell">
          <StatDisplay label="Roll" value={readout.roll} />
        </div>
      </div>
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-3">
        <div className="navigation-autopilot__cell">
          <StatDisplay label="RCS" value={readout.rcs} />
        </div>
        <div className="navigation-autopilot__cell">
          <StatDisplay label="Drift" value={readout.drift} />
        </div>
        <div className="navigation-autopilot__cell">
          <StatDisplay label="Spin" value={readout.spin} />
        </div>
      </div>
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-4">
        {ATTITUDE_COMMANDS.map((command) => (
          <button
            key={command}
            type="button"
            className={[
              "navigation-autopilot__command",
              command === activeCommand && "navigation-autopilot__command--active",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={command === activeCommand}
            onClick={() => setActiveCommand(command)}
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  );
}

/** A jump destination plotted on the star chart and selectable as the active target. */
interface Waypoint {
  /** Waypoint slot label, e.g. "WP 01". */
  tag: string;
  /** System/star name. */
  name: string;
  /** Distance to the waypoint in parsecs. */
  dist: string;
  /** Estimated time of arrival at current course. */
  eta: string;
  /** Course bearing to the waypoint. */
  bearing: string;
  /** Number of FTL jumps required to reach the waypoint. */
  jumps: string;
  /** Horizontal position on the star chart, percentage (0-100). */
  xPct: number;
  /** Vertical position on the star chart, percentage (0-100). */
  yPct: number;
}

const WAYPOINTS: Waypoint[] = [
  {
    tag: "WP 01",
    name: "TAU CETI e",
    dist: "3.65 pc",
    eta: "112 d",
    bearing: "198.4°",
    jumps: "2",
    xPct: 46,
    yPct: 38,
  },
  {
    tag: "WP 02",
    name: "KEID BRANCH",
    dist: "4.90 pc",
    eta: "151 d",
    bearing: "214.6°",
    jumps: "3",
    xPct: 69,
    yPct: 58,
  },
  {
    tag: "WP 03",
    name: "HELIX WELL",
    dist: "6.20 pc",
    eta: "187 d",
    bearing: "176.2°",
    jumps: "4",
    xPct: 83,
    yPct: 29,
  },
  {
    tag: "WP 04",
    name: "GLIESE 581",
    dist: "2.40 pc",
    eta: "74 d",
    bearing: "241.0°",
    jumps: "1",
    xPct: 33,
    yPct: 26,
  },
];

/** Right column content for the navigation view in autopilot mode: star chart and course. */
export function NavigationAutopilotRight(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(3);
  const target = WAYPOINTS[activeIndex];

  return (
    <div className="navigation-autopilot-right">
      <div className="navigation-autopilot__row navigation-autopilot__row--primary">
        <StarChart
          caption="GAL. LONGITUDE → SECTOR 14 / ORION SPUR"
          waypoints={WAYPOINTS}
          activeIndex={activeIndex}
        />
      </div>
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-4">
        {WAYPOINTS.map((waypoint, index) => (
          <button
            key={waypoint.name}
            type="button"
            className={[
              "navigation-autopilot__waypoint",
              index === activeIndex && "navigation-autopilot__command--active",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <span className="navigation-autopilot__waypoint-tag">{waypoint.tag}</span>
            <span className="navigation-autopilot__waypoint-name">{waypoint.name}</span>
            <span className="navigation-autopilot__waypoint-meta">
              {waypoint.dist} · {waypoint.eta}
            </span>
          </button>
        ))}
      </div>
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-4">
        <div className="navigation-autopilot__cell">
          <StatDisplay label="Course" value={target.bearing} />
        </div>
        <div className="navigation-autopilot__cell">
          <StatDisplay label="Distance" value={target.dist} />
        </div>
        <div className="navigation-autopilot__cell">
          <StatDisplay label="Jumps" value={target.jumps} />
        </div>
        <div className="navigation-autopilot__cell">
          <StatDisplay label="Arrival" value={target.eta} />
        </div>
      </div>
    </div>
  );
}
