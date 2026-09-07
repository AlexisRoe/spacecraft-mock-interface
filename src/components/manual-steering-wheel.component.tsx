import { type JSX, type PointerEvent as ReactPointerEvent, useState } from "react";

import "./manual-steering-wheel.component.css";

const SIZE = 200;
const CENTER = SIZE / 2;
const HALF = SIZE / 2;
const DISC_RADIUS = SIZE * 0.3;

/** One of the eight 45°-wide RCS translation/roll fields around the attitude disc. */
interface WedgeField {
  /** Human-readable command this wedge triggers, e.g. "Surge +". */
  label: string;
}

/** Wedges in clockwise order starting at 12 o'clock, matching the reference design. */
const WEDGE_FIELDS: WedgeField[] = [
  { label: "Roll +" },
  { label: "Surge +" },
  { label: "Surge −" },
  { label: "Sway +" },
  { label: "Sway −" },
  { label: "Heave −" },
  { label: "Heave +" },
  { label: "Roll −" },
];

/** Point on the square's boundary in the direction of `angleDeg`, measured clockwise from up. */
function pointOnSquare(angleDeg: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.sin(rad);
  const dy = -Math.cos(rad);
  const tx = dx !== 0 ? HALF / Math.abs(dx) : Number.POSITIVE_INFINITY;
  const ty = dy !== 0 ? HALF / Math.abs(dy) : Number.POSITIVE_INFINITY;
  const t = Math.min(tx, ty);
  return [CENTER + t * dx, CENTER + t * dy];
}

/** SVG polygon points string for the wedge spanning `[angleDeg, angleDeg + 45)`. */
function wedgePoints(angleDeg: number): string {
  const [x1, y1] = pointOnSquare(angleDeg);
  const [x2, y2] = pointOnSquare(angleDeg + 45);
  return `${CENTER},${CENTER} ${x1},${y1} ${x2},${y2}`;
}

/**
 * Attitude control wheel: a center disc with a draggable yaw/pitch stick,
 * surrounded by eight wedge fields for roll and RCS translation commands.
 */
export function ManualSteeringWheel(): JSX.Element {
  const [activeWedge, setActiveWedge] = useState<number | null>(null);
  const [stick, setStick] = useState({ x: 0, y: 0 });
  const [isDraggingStick, setDraggingStick] = useState(false);

  function applyStickPosition(event: ReactPointerEvent<SVGCircleElement>): void {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    const magnitude = Math.hypot(dx, dy);
    const scale = magnitude > 1 ? 1 / magnitude : 1;
    setStick({ x: dx * scale, y: dy * scale });
  }

  function handleStickPointerDown(event: ReactPointerEvent<SVGCircleElement>): void {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDraggingStick(true);
    applyStickPosition(event);
  }

  function handleStickPointerMove(event: ReactPointerEvent<SVGCircleElement>): void {
    if (!isDraggingStick) return;
    applyStickPosition(event);
  }

  function handleStickPointerUp(): void {
    setDraggingStick(false);
    setStick({ x: 0, y: 0 });
  }

  const stickX = CENTER + stick.x * DISC_RADIUS * 0.85;
  const stickY = CENTER + stick.y * DISC_RADIUS * 0.85;

  return (
    // biome-ignore lint/a11y/useSemanticElements: SVG shapes can't be native <fieldset>/<button> elements.
    <svg
      className="manual-steering-wheel"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="none"
      role="group"
      aria-label="Attitude control wheel"
    >
      {WEDGE_FIELDS.map((field, index) => (
        // biome-ignore lint/a11y/useSemanticElements: SVG shapes can't be native <button> elements.
        <polygon
          key={field.label}
          className={[
            "manual-steering-wheel__wedge",
            index === activeWedge && "manual-steering-wheel__wedge--active",
          ]
            .filter(Boolean)
            .join(" ")}
          points={wedgePoints(index * 45)}
          role="button"
          tabIndex={0}
          aria-label={field.label}
          aria-pressed={index === activeWedge}
          onClick={() => setActiveWedge(index)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setActiveWedge(index);
            }
          }}
        />
      ))}

      <circle className="manual-steering-wheel__disc" cx={CENTER} cy={CENTER} r={DISC_RADIUS} />
      <circle
        className="manual-steering-wheel__stick-pad"
        cx={CENTER}
        cy={CENTER}
        r={DISC_RADIUS}
        role="slider"
        tabIndex={0}
        aria-label="Yaw and pitch stick"
        aria-valuenow={0}
        onPointerDown={handleStickPointerDown}
        onPointerMove={handleStickPointerMove}
        onPointerUp={handleStickPointerUp}
        onPointerCancel={handleStickPointerUp}
      />

      <g className="manual-steering-wheel__crosshair">
        <line x1={CENTER - 16} y1={CENTER} x2={CENTER - 6} y2={CENTER} />
        <line x1={CENTER + 6} y1={CENTER} x2={CENTER + 16} y2={CENTER} />
        <line x1={CENTER} y1={CENTER - 16} x2={CENTER} y2={CENTER - 6} />
        <line x1={CENTER} y1={CENTER + 6} x2={CENTER} y2={CENTER + 16} />
      </g>

      <line
        className="manual-steering-wheel__stick-line"
        x1={CENTER}
        y1={CENTER}
        x2={stickX}
        y2={stickY}
      />
      <circle className="manual-steering-wheel__stick-dot" cx={stickX} cy={stickY} r={4} />

      <circle
        className="manual-steering-wheel__disc-outline"
        cx={CENTER}
        cy={CENTER}
        r={DISC_RADIUS}
      />
      <rect
        className="manual-steering-wheel__frame"
        x={1}
        y={1}
        width={SIZE - 2}
        height={SIZE - 2}
      />
    </svg>
  );
}
