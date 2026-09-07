import { type JSX, useState } from "react";
import { GyroCompass } from "./gyro-compass.component";
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

/** Right column content for the navigation view in autopilot mode. */
export function NavigationAutopilotRight(): JSX.Element {
  const cells = ["Param 1", "Param 2", "Param 3", "Param 4"];
  const cells2 = ["Param 5", "Param 6", "Param 7", "Param 8"];

  return (
    <div className="navigation-autopilot-right">
      <div className="navigation-autopilot__row navigation-autopilot__row--primary" />
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-4">
        {cells.map((label) => (
          <div className="navigation-autopilot__cell" key={label}>
            <StatDisplay label={label} value="--" />
          </div>
        ))}
      </div>
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-4">
        {cells2.map((label) => (
          <div className="navigation-autopilot__cell" key={label}>
            <StatDisplay label={label} value="--" />
          </div>
        ))}
      </div>
    </div>
  );
}
