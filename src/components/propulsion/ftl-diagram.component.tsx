import { type JSX, useEffect } from "react";
import { useFtlDriveStore } from "../../stores/ftl-drive.store";
import { useSpacecraftStore } from "../../stores/spacecraft.store";
import { computeFtlPerformance } from "../../utils/compute-ftl-performance.util";

import "./ftl-diagram.component.css";

/** Number of field arcs drawn around each nacelle at full field strength. */
const MAX_FIELD_ARCS = 3;

/** Velocity restored, as a fraction of light speed, when the FTL drive is disengaged. */
const SUBLIGHT_CRUISE_VELOCITY_C = 0.041;

/** Nacelle A's center point, `{x, y}`, in the diagram's viewBox. */
const NACELLE_A_CENTER = { x: 408, y: 58 };
/** Nacelle B's center point, `{x, y}`, in the diagram's viewBox. */
const NACELLE_B_CENTER = { x: 408, y: 262 };

/** Builds an SVG arc path of radius `r` around `{cx, cy}`, from `a0` to `a1` degrees. */
function arcPath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const point = (angleDeg: number): [number, number] => {
    const rad = (angleDeg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const [x0, y0] = point(a0);
  const [x1, y1] = point(a1);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}

/** Draws the field arcs fanning outward (away from the warp core) around a nacelle. */
function NacelleField({
  center,
  sweepStart,
  sweepEnd,
  arcCount,
  dash,
}: {
  center: { x: number; y: number };
  sweepStart: number;
  sweepEnd: number;
  arcCount: number;
  dash: string;
}): JSX.Element {
  return (
    <>
      {Array.from({ length: arcCount }, (_, index) => {
        const radius = 24 + index * 10;
        return (
          <path
            key={radius}
            d={arcPath(center.x, center.y, radius, sweepStart, sweepEnd)}
            strokeWidth={1.2}
            strokeDasharray={dash}
            opacity={0.6 - index * 0.15}
          />
        );
      })}
    </>
  );
}

/**
 * Right-hand panel of the Propulsion console's FTL view: a schematic of the
 * matter/antimatter feed, intermix chamber, warp core, and both field-coil
 * nacelles, sourced from {@link useFtlDriveStore}, plus the flash-coils and
 * engage/disengage controls at the bottom. Feed pipe widths track the
 * intermix ratio, the core-to-nacelle split tracks the field geometry, and
 * the subspace field arcs scale in count, spread, and opacity with field
 * strength. Flashing the coils runs a 3-second recalibration cycle, ticked
 * once per second. Engaging the FTL drive sets the spacecraft store's
 * flight state and velocity (shown in the dashboard header) to the live
 * lightspeed factor; disengaging restores sublight cruise.
 */
export function FtlDiagram(): JSX.Element {
  const intermixRatio = useFtlDriveStore((state) => state.intermixRatio);
  const fieldStrength = useFtlDriveStore((state) => state.fieldStrength);
  const fieldGeometry = useFtlDriveStore((state) => state.fieldGeometry);
  const flashingCoils = useFtlDriveStore((state) => state.flashingCoils);
  const coilFlashSeconds = useFtlDriveStore((state) => state.coilFlashSeconds);
  const startFlashCoils = useFtlDriveStore((state) => state.startFlashCoils);
  const tickCoilFlash = useFtlDriveStore((state) => state.tickCoilFlash);
  const ftlEngaged = useFtlDriveStore((state) => state.ftlEngaged);
  const toggleFtlEngaged = useFtlDriveStore((state) => state.toggleFtlEngaged);
  const setFlightState = useSpacecraftStore((state) => state.setFlightState);
  const setVelocityC = useSpacecraftStore((state) => state.setVelocityC);

  const { lightspeedFactor } = computeFtlPerformance(intermixRatio, fieldStrength);

  useEffect(() => {
    if (!flashingCoils) return;
    const interval = setInterval(tickCoilFlash, 1000);
    return () => clearInterval(interval);
  }, [flashingCoils, tickCoilFlash]);

  useEffect(() => {
    if (!ftlEngaged) return;
    setFlightState("FTL");
    setVelocityC(lightspeedFactor);
  }, [ftlEngaged, lightspeedFactor, setFlightState, setVelocityC]);

  function handleToggleEngage(): void {
    if (ftlEngaged) {
      setFlightState("Cruise");
      setVelocityC(SUBLIGHT_CRUISE_VELOCITY_C);
    }
    toggleFtlEngaged();
  }

  const matterWidth = 3 + (intermixRatio / 100) * 9;
  const antimatterWidth = 3 + ((100 - intermixRatio) / 100) * 9;
  const coreWidth = 4 + (fieldStrength / 100) * 8;
  const nacelleAWidth = fieldGeometry === "asymmetric" ? coreWidth * 0.75 : coreWidth * 0.5;
  const nacelleBWidth = fieldGeometry === "asymmetric" ? coreWidth * 0.25 : coreWidth * 0.5;
  const arcCount = Math.max(0, Math.round((fieldStrength / 100) * MAX_FIELD_ARCS));
  const arcDash = fieldGeometry === "subspace" ? "3 5" : "12 7";
  const arcSpread = fieldGeometry === "subspace" ? 30 : 12;
  const fieldOpacity = flashingCoils ? 0.3 : 1;

  return (
    <div className="ftl-diagram">
      <svg
        className="ftl-diagram__svg"
        viewBox="0 0 460 320"
        role="img"
        aria-label="Matter/antimatter intermix and field coil schematic"
      >
        <defs>
          <pattern id="ftl-diagram-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="1" fill="var(--color-grey-lightest)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="460" height="320" fill="url(#ftl-diagram-dots)" />

        <g fill="none" stroke="var(--color-black)" strokeLinecap="round" strokeLinejoin="round">
          {/* matter / antimatter tanks */}
          <rect x="16" y="40" width="100" height="56" rx="27" strokeWidth={2} />
          <rect x="16" y="224" width="100" height="56" rx="27" strokeWidth={2} />
          <path d="M60 40 V96 M104 40 V96" stroke="var(--color-grey-light)" strokeWidth={1} />
          <path d="M60 224 V280 M104 224 V280" stroke="var(--color-grey-light)" strokeWidth={1} />

          {/* feed line casings, drawn under the fill so the pipe reads as hollow tube */}
          <path
            d="M116 68 H170 C198 68 200 160 224 160"
            stroke="var(--color-grey-lightest)"
            strokeWidth={matterWidth + 6}
          />
          <path
            d="M116 252 H170 C198 252 200 160 224 160"
            stroke="var(--color-grey-lightest)"
            strokeWidth={antimatterWidth + 6}
          />
          <path d="M116 68 H170 C198 68 200 160 224 160" strokeWidth={matterWidth} />
          <path d="M116 252 H170 C198 252 200 160 224 160" strokeWidth={antimatterWidth} />

          {/* shutoff valves */}
          <circle cx="170" cy="68" r="9" strokeWidth={1.6} fill="var(--color-white)" />
          <path d="M164 62 L176 74 M176 62 L164 74" strokeWidth={1.3} />
          <circle cx="170" cy="252" r="9" strokeWidth={1.6} fill="var(--color-white)" />
          <path d="M164 246 L176 258 M176 246 L164 258" strokeWidth={1.3} />

          {/* intermix chamber */}
          <circle cx="230" cy="160" r="22" strokeWidth={2} fill="var(--color-white)" />
          <circle
            cx="230"
            cy="160"
            r="30"
            stroke="var(--color-grey-light)"
            strokeWidth={1}
            strokeDasharray="3 6"
          />
          <path d="M216 150 C223 160 237 160 244 170" strokeWidth={1.4} />
          <path d="M216 170 C223 160 237 160 244 150" strokeWidth={1.4} />

          {/* chamber to warp core */}
          <path d="M252 160 H266" strokeWidth={coreWidth} />
          <rect x="266" y="134" width="80" height="52" rx="8" strokeWidth={2} />
          <path
            d="M280 144 h10 M280 154 h10 M280 166 h10 M280 176 h10"
            stroke="var(--color-grey-light)"
            strokeWidth={1.2}
          />

          {/* core to nacelle manifold */}
          <path
            d={`M346 148 C368 148 368 ${NACELLE_A_CENTER.y + 4} ${NACELLE_A_CENTER.x - 28} ${NACELLE_A_CENTER.y}`}
            strokeWidth={nacelleAWidth}
            opacity={fieldOpacity}
          />
          <path
            d={`M346 172 C368 172 368 ${NACELLE_B_CENTER.y - 4} ${NACELLE_B_CENTER.x - 28} ${NACELLE_B_CENTER.y}`}
            strokeWidth={nacelleBWidth}
            opacity={fieldOpacity}
          />

          {/* nacelles */}
          <rect
            x={NACELLE_A_CENTER.x - 28}
            y={NACELLE_A_CENTER.y - 17}
            width="56"
            height="34"
            rx="10"
            strokeWidth={2}
          />
          <rect
            x={NACELLE_B_CENTER.x - 28}
            y={NACELLE_B_CENTER.y - 17}
            width="56"
            height="34"
            rx="10"
            strokeWidth={2}
          />

          <g opacity={fieldOpacity}>
            <NacelleField
              center={NACELLE_A_CENTER}
              sweepStart={200 - arcSpread}
              sweepEnd={340 + arcSpread}
              arcCount={arcCount}
              dash={arcDash}
            />
            <NacelleField
              center={NACELLE_B_CENTER}
              sweepStart={20 - arcSpread}
              sweepEnd={160 + arcSpread}
              arcCount={arcCount}
              dash={arcDash}
            />
          </g>
        </g>

        <g
          fontFamily="inherit"
          fontSize="9"
          letterSpacing="0.5"
          fill="var(--color-grey-mid)"
          textAnchor="middle"
        >
          <text x="66" y="30">
            MATTER
          </text>
          <text x="66" y="298">
            ANTIMATTER
          </text>
          <text x="230" y="200">
            INTERMIX
          </text>
          <text x="306" y="124">
            WARP CORE
          </text>
          <text x={NACELLE_A_CENTER.x} y={NACELLE_A_CENTER.y - 26}>
            NACELLE A
          </text>
          <text x={NACELLE_B_CENTER.x} y={NACELLE_B_CENTER.y + 30}>
            NACELLE B
          </text>
        </g>
      </svg>

      <div className="ftl-diagram__readouts">
        <div className="ftl-diagram__readout">
          <span>Intermix</span>
          <span>{`${intermixRatio}:${100 - intermixRatio}`}</span>
        </div>
        <div className="ftl-diagram__readout">
          <span>Field Strength</span>
          <span>{`${fieldStrength} ${fieldStrength === 1 ? "cochrane" : "cochranes"}`}</span>
        </div>
        <div className="ftl-diagram__readout">
          <span>Geometry</span>
          <span>{fieldGeometry.toUpperCase()}</span>
        </div>
      </div>

      <button
        type="button"
        className="ftl-diagram__flash-button"
        onClick={startFlashCoils}
        disabled={flashingCoils}
      >
        {flashingCoils ? `Flashing Coils ${coilFlashSeconds}s` : "Flash Coils"}
      </button>

      <button
        type="button"
        className={[
          "ftl-diagram__engage-button",
          ftlEngaged && "ftl-diagram__engage-button--active",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={handleToggleEngage}
        aria-pressed={ftlEngaged}
      >
        {ftlEngaged ? "Disengage FTL" : "Engage FTL"}
      </button>
    </div>
  );
}
