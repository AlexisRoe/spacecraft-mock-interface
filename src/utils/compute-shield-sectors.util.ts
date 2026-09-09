import type { ShieldQuadrantId } from "../stores/shields.store";

/** A point on the shield diagram's SVG canvas. */
interface Point {
  x: number;
  y: number;
}

/** An elliptical radius pair (`x` and `y` radii differ since the ship silhouette isn't circular). */
type Radius = Point;

/** One hatched arc segment of a shield quadrant's rendered strength. */
export interface ShieldSectorLayer {
  /** Unique id for this layer's hatch pattern. */
  id: string;
  /** SVG path `d` attribute for this arc segment. */
  d: string;
  /** Hatch stroke width; 0 when this band is unpowered. */
  strokeWidth: number;
}

/** Center of the shield diagram's arcs, in SVG viewBox units. */
const CENTER: Point = { x: 521, y: 167 };

/** Angular gap, in degrees, left between adjacent quadrants' arcs. */
const GAP_DEGREES = 5;

/** Start/end angle, in degrees, of each quadrant's arc sweep around {@link CENTER}. */
const QUADRANT_SWEEPS: Record<ShieldQuadrantId, { start: number; end: number }> = {
  fore: { start: 135, end: 225 },
  dorsal: { start: 225, end: 315 },
  aft: { start: 315, end: 405 },
  ventral: { start: 45, end: 135 },
};

/** Inner/outer radius pairs for the three concentric hatch bands drawn per quadrant. */
const BANDS: [Radius, Radius][] = [
  [
    { x: 358, y: 112 },
    { x: 376, y: 130 },
  ],
  [
    { x: 382, y: 136 },
    { x: 400, y: 154 },
  ],
  [
    { x: 406, y: 160 },
    { x: 424, y: 178 },
  ],
];

/** Builds an SVG path for the ring segment between `inner` and `outer` radii, from `a0` to `a1` degrees. */
function sectorPath(a0: number, a1: number, inner: Radius, outer: Radius): string {
  const start = ((a0 + GAP_DEGREES) * Math.PI) / 180;
  const end = ((a1 - GAP_DEGREES) * Math.PI) / 180;
  const point = (radius: Radius, angle: number): [number, number] => [
    CENTER.x + radius.x * Math.cos(angle),
    CENTER.y + radius.y * Math.sin(angle),
  ];
  const format = (n: number) => n.toFixed(2);
  const [ox0, oy0] = point(outer, start);
  const [ox1, oy1] = point(outer, end);
  const [ix1, iy1] = point(inner, end);
  const [ix0, iy0] = point(inner, start);
  return (
    `M ${format(ox0)} ${format(oy0)} A ${outer.x} ${outer.y} 0 0 1 ${format(ox1)} ${format(oy1)} ` +
    `L ${format(ix1)} ${format(iy1)} A ${inner.x} ${inner.y} 0 0 0 ${format(ix0)} ${format(iy0)} Z`
  );
}

/**
 * Builds the three hatched arc layers for one shield quadrant, given its
 * current strength (0-100). Each band lights up in turn as strength climbs
 * through its third of the range, with hatch density (stroke width) scaling
 * within that band; bands past the current strength render at zero width.
 */
export function computeShieldSectorLayers(
  quadrantId: ShieldQuadrantId,
  strengthPercent: number,
): ShieldSectorLayer[] {
  const { start, end } = QUADRANT_SWEEPS[quadrantId];
  const clamped = Math.max(0, Math.min(100, strengthPercent));

  return BANDS.map((band, index) => {
    const bandFraction = 100 / BANDS.length;
    const local = Math.max(0, Math.min(1, (clamped - index * bandFraction) / bandFraction));
    return {
      id: `shield-hatch-${quadrantId}-${index}`,
      d: sectorPath(start, end, band[0], band[1]),
      strokeWidth: local <= 0 ? 0 : +(0.35 + local * 1.75).toFixed(2),
    };
  });
}
