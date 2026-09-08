import type { JSX } from "react";
import { useProbeConsoleStore } from "../../stores/probe-console.store";
import type { ProbeBay } from "../../utils/probe-deployment.util";

import "./probe-deployment-diagram.component.css";

/** Centre of the planet body and its range rings, in the 0-1000 SVG viewBox. */
const PLANET_X = 500;
const PLANET_Y = 500;

/** Position of the home/launch marker (orbital relay station) probes deploy from. */
const HOME_X = 327;
const HOME_Y = 400;

/** Fixed per-target diagram detail (trajectory curve, footprint cone, arrowhead) for each bay. */
interface ProbeDiagramDetail {
  trajectory: string;
  footprintLineA: { x1: number; y1: number; x2: number; y2: number };
  footprintLineB: { x1: number; y1: number; x2: number; y2: number };
  footprintEllipse: { cx: number; cy: number; rotate: number };
  arrowhead: string;
}

/** Diagram detail for each bay, indexed the same way as `INITIAL_PROBE_BAYS`. */
const PROBE_DIAGRAM_DETAILS: ProbeDiagramDetail[] = [
  {
    trajectory: "M327,400 Q569,293 735,415",
    footprintLineA: { x1: 735, y1: 415, x2: 647, y2: 495 },
    footprintLineB: { x1: 735, y1: 415, x2: 616, y2: 410 },
    footprintEllipse: { cx: 631.6, cy: 452.4, rotate: 70.1 },
    arrowhead: "M726,401 L741,414 L725,427",
  },
  {
    trajectory: "M327,400 Q472,748 648,817",
    footprintLineA: { x1: 648, y1: 817, x2: 518, y2: 646 },
    footprintLineB: { x1: 648, y1: 817, x2: 600, y2: 608 },
    footprintEllipse: { cx: 559.2, cy: 626.8, rotate: 155 },
    arrowhead: "M632,806 L647,816 L636,830",
  },
  {
    trajectory: "M327,400 Q68,598 102,730",
    footprintLineA: { x1: 102, y1: 730, x2: 356, y2: 531 },
    footprintLineB: { x1: 102, y1: 730, x2: 401, y2: 609 },
    footprintEllipse: { cx: 378.8, cy: 570, rotate: 60 },
    arrowhead: "M113,714 L103,730 L118,738",
  },
];

/** Pairs each bay with its fixed diagram detail, by roster order. */
function pairBaysWithDetail(bays: ProbeBay[]): Array<[ProbeBay, ProbeDiagramDetail]> {
  return bays.map((bay, index) => [
    bay,
    PROBE_DIAGRAM_DETAILS[index % PROBE_DIAGRAM_DETAILS.length],
  ]);
}

/**
 * Right-hand diagram of the Science view's probes state: a planet body at
 * the centre of a set of orbital range rings, with a home marker for the
 * ship's orbital relay. Each bay's trajectory, footprint, comms link and
 * bold-ringed target marker appear on the diagram only once its probe is
 * deployed, and disappear again once it's recalled. Fills the available
 * space and scales responsively via its SVG viewBox.
 */
export function ProbeDeploymentDiagram(): JSX.Element {
  const bays = useProbeConsoleStore((state) => state.bays);
  const paired = pairBaysWithDetail(bays);
  const visiblePaired = paired.filter(([bay]) => bay.status === "deployed");

  return (
    <div className="probe-deployment-diagram">
      <svg
        className="probe-deployment-diagram__svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Probe deployment diagram"
      >
        <defs>
          <pattern id="probe-diagram-fill" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="var(--color-white)" />
            <circle cx="3" cy="3" r="0.9" fill="var(--color-black)" />
            <circle cx="11" cy="11" r="0.9" fill="var(--color-black)" />
          </pattern>
          <clipPath id="probe-diagram-planet-clip">
            <circle cx={PLANET_X} cy={PLANET_Y} r="140" />
          </clipPath>
        </defs>

        <g fill="var(--color-black)" stroke="none">
          <circle cx="58" cy="70" r="2.2" />
          <circle cx="196" cy="42" r="1.3" />
          <circle cx="311" cy="118" r="1.8" />
          <circle cx="452" cy="58" r="1.2" />
          <circle cx="596" cy="96" r="2.4" />
          <circle cx="702" cy="38" r="1.4" />
          <circle cx="812" cy="132" r="1.9" />
          <circle cx="946" cy="62" r="1.3" />
          <circle cx="884" cy="228" r="2.1" />
          <circle cx="962" cy="352" r="1.4" />
          <circle cx="918" cy="470" r="1.8" />
          <circle cx="972" cy="612" r="1.2" />
          <circle cx="886" cy="726" r="2.3" />
          <circle cx="944" cy="866" r="1.5" />
          <circle cx="796" cy="912" r="1.8" />
          <circle cx="672" cy="964" r="1.3" />
          <circle cx="512" cy="938" r="2.2" />
          <circle cx="372" cy="972" r="1.4" />
          <circle cx="236" cy="898" r="1.9" />
          <circle cx="98" cy="946" r="1.3" />
          <circle cx="42" cy="808" r="2.1" />
          <circle cx="126" cy="668" r="1.4" />
          <circle cx="36" cy="546" r="1.8" />
          <circle cx="88" cy="418" r="1.2" />
          <circle cx="28" cy="286" r="2.3" />
          <circle cx="168" cy="248" r="1.5" />
          <circle cx="284" cy="332" r="1.3" />
          <circle cx="742" cy="292" r="1.4" />
          <circle cx="806" cy="608" r="1.6" />
          <circle cx="268" cy="782" r="1.5" />
          <circle cx="622" cy="196" r="1.2" />
          <circle cx="418" cy="212" r="1.3" />
        </g>

        <g fill="none" stroke="var(--color-black)" strokeWidth="1.6" strokeLinecap="round">
          <path d="M660,300 L660,326 M647,313 L673,313" />
          <path d="M180,600 L180,622 M169,611 L191,611" />
          <path d="M840,760 L840,782 M829,771 L851,771" />
          <circle cx="150" cy="152" r="46" fill="url(#probe-diagram-fill)" strokeWidth="2" />
          <path d="M150,106 A46,46 0 0 1 150,198" strokeWidth="1.2" strokeDasharray="3 5" />
          <circle cx="862" cy="836" r="18" fill="var(--color-white)" strokeWidth="2" />
          <circle cx="908" cy="782" r="7" fill="var(--color-white)" strokeWidth="1.6" />
          <circle cx="824" cy="892" r="4.5" fill="var(--color-white)" strokeWidth="1.4" />
          <path d="M700,872 q40,-14 84,-6" strokeWidth="1.2" strokeDasharray="2 7" />
        </g>

        <g fill="none" stroke="var(--color-black)" strokeLinecap="round">
          <circle
            cx={PLANET_X}
            cy={PLANET_Y}
            r="140"
            fill="url(#probe-diagram-fill)"
            stroke="var(--color-black)"
            strokeWidth="3"
          />
          <g
            clipPath="url(#probe-diagram-planet-clip)"
            stroke="var(--color-black)"
            strokeWidth="1.2"
          >
            <line x1={PLANET_X - 140} y1={PLANET_Y - 60} x2={PLANET_X + 140} y2={PLANET_Y - 60} />
            <line x1={PLANET_X - 140} y1={PLANET_Y + 60} x2={PLANET_X + 140} y2={PLANET_Y + 60} />
            <ellipse cx={PLANET_X} cy={PLANET_Y} rx="52" ry="140" />
          </g>

          <circle cx={PLANET_X} cy={PLANET_Y} r="200" strokeWidth="1.2" strokeDasharray="1 9" />
          <circle cx={PLANET_X} cy={PLANET_Y} r="250" strokeWidth="1.6" />
          <circle cx={PLANET_X} cy={PLANET_Y} r="350" strokeWidth="1.6" />
          <circle cx={PLANET_X} cy={PLANET_Y} r="460" strokeWidth="1.6" />

          {visiblePaired.map(([bay, detail]) => (
            <g key={`footprint-${bay.id}`} strokeWidth="1.4">
              <line {...detail.footprintLineA} />
              <line {...detail.footprintLineB} />
              <ellipse
                cx={detail.footprintEllipse.cx}
                cy={detail.footprintEllipse.cy}
                rx="45"
                ry="17"
                transform={`rotate(${detail.footprintEllipse.rotate} ${detail.footprintEllipse.cx} ${detail.footprintEllipse.cy})`}
                strokeDasharray="3 5"
              />
            </g>
          ))}

          {visiblePaired.map(([bay, detail]) => (
            <path
              key={`trajectory-${bay.id}`}
              className="probe-deployment-diagram__trajectory"
              d={detail.trajectory}
              strokeWidth="2"
            />
          ))}

          {visiblePaired.map(([bay]) => (
            <line
              key={`comms-${bay.id}`}
              x1={HOME_X}
              y1={HOME_Y}
              x2={bay.target.x}
              y2={bay.target.y}
              strokeWidth="1.8"
              strokeDasharray="0.1 7"
            />
          ))}

          <g>
            <circle cx={HOME_X} cy={HOME_Y} r="26" strokeWidth="1.4" strokeDasharray="2 6" />
            <path
              d={`M${HOME_X},${HOME_Y - 18} L${HOME_X + 18},${HOME_Y} L${HOME_X},${HOME_Y + 18} L${HOME_X - 18},${HOME_Y} Z`}
              fill="var(--color-black)"
              stroke="var(--color-black)"
              strokeWidth="2"
            />
            <line x1="299" y1="372" x2="286" y2="359" />
            <line x1="355" y1="428" x2="368" y2="441" />
          </g>

          <g fill="var(--color-black)">
            {visiblePaired.map(([bay]) => (
              <g key={`marker-${bay.id}`} className="probe-deployment-diagram__marker--deployed">
                <circle
                  cx={bay.target.x}
                  cy={bay.target.y}
                  r="7.5"
                  fill="var(--color-black)"
                  stroke="var(--color-black)"
                  strokeWidth="2"
                />
                <circle cx={bay.target.x} cy={bay.target.y} r="18" fill="none" strokeWidth="4" />
              </g>
            ))}
          </g>

          {visiblePaired.map(([bay, detail]) => (
            <path key={`arrowhead-${bay.id}`} d={detail.arrowhead} strokeWidth="2" fill="none" />
          ))}
        </g>
      </svg>
    </div>
  );
}
