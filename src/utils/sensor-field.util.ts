const PLOT_X0 = 120;
const PLOT_X1 = 940;
const PLOT_Y0 = 90;
const PLOT_Y1 = 590;

/** A single plotted scatter point in the {@link SensorFieldData} plot area. */
export interface SensorFieldPoint {
  /** X coordinate in plot-space (matches the component's SVG viewBox). */
  x: number;
  /** Y coordinate in plot-space (matches the component's SVG viewBox). */
  y: number;
  /** Marker radius, in plot-space units. */
  r: number;
}

/** A single histogram bar in the {@link SensorFieldData} top/side spectra. */
export interface SensorFieldBar {
  /** Index of the bar along its axis. */
  position: number;
  /** Bar length, in plot-space units. */
  size: number;
}

/** Deterministic mock scatter/trace/histogram data plotted by `SensorField`. */
export interface SensorFieldData {
  /** Dense scatter cluster representing a detected particle concentration. */
  clusterPoints: SensorFieldPoint[];
  /** Sparse scatter stream representing a drifting particle emission. */
  streamPoints: SensorFieldPoint[];
  /** Nodes of the scanning trend line, left to right across the plot. */
  traceNodes: { x: number; y: number }[];
  /** SVG path `d` attribute connecting `traceNodes`. */
  tracePath: string;
  /** Spectral density histogram bars rendered above the plot. */
  topBars: SensorFieldBar[];
  /** Spectral density histogram bars rendered to the right of the plot. */
  sideBars: SensorFieldBar[];
}

function createRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function gaussian(rng: () => number): number {
  return (rng() + rng() + rng() - 1.5) / 1.5;
}

function isInsidePlot(x: number, y: number): boolean {
  return x > PLOT_X0 + 3 && x < PLOT_X1 - 3 && y > PLOT_Y0 + 3 && y < PLOT_Y1 - 3;
}

/**
 * Generates deterministic mock sensor field data (scatter clusters, a scan
 * trace, and spectral histograms) for a given seed, used by `SensorField`.
 */
export function generateSensorFieldData(seed: number): SensorFieldData {
  const rng = createRng(seed);

  const clusterPoints: SensorFieldPoint[] = [];
  for (let i = 0; i < 140; i++) {
    const x = 428 + gaussian(rng) * 78;
    const y = 352 + gaussian(rng) * 66;
    if (isInsidePlot(x, y)) {
      clusterPoints.push({
        x: +x.toFixed(1),
        y: +y.toFixed(1),
        r: +(0.8 + rng() * 1.9).toFixed(2),
      });
    }
  }

  const streamPoints: SensorFieldPoint[] = [];
  for (let i = 0; i < 45; i++) {
    const t = rng();
    const x = 690 + t * 170 + gaussian(rng) * 26;
    const y = 400 - t * 165 + gaussian(rng) * 22;
    if (isInsidePlot(x, y)) {
      streamPoints.push({
        x: +x.toFixed(1),
        y: +y.toFixed(1),
        r: +(1.6 + rng() * 2.6).toFixed(2),
      });
    }
  }

  const traceNodes = Array.from({ length: 10 }, (_, i) => {
    const t = i / 9;
    return {
      x: +(PLOT_X0 + 24 + t * 760).toFixed(1),
      y: +(540 - t * 340 + Math.sin(t * 7.5) * 46 + gaussian(rng) * 10).toFixed(1),
    };
  });
  const tracePath = traceNodes.map((node, i) => `${i ? "L" : "M"} ${node.x} ${node.y}`).join(" ");

  const topBars: SensorFieldBar[] = Array.from({ length: 42 }, (_, i) => {
    const t = i / 42;
    const v =
      Math.exp(-(((t - 0.38) / 0.13) ** 2)) * 0.9 +
      Math.exp(-(((t - 0.76) / 0.09) ** 2)) * 0.55 +
      rng() * 0.12;
    return { position: i, size: +(Math.min(1, v) * 38).toFixed(2) };
  });

  const sideBars: SensorFieldBar[] = Array.from({ length: 28 }, (_, i) => {
    const t = i / 28;
    const v =
      Math.exp(-(((t - 0.52) / 0.15) ** 2)) * 0.95 +
      Math.exp(-(((t - 0.2) / 0.07) ** 2)) * 0.4 +
      rng() * 0.1;
    return { position: i, size: +(Math.min(1, v) * 76).toFixed(2) };
  });

  return { clusterPoints, streamPoints, traceNodes, tracePath, topBars, sideBars };
}
