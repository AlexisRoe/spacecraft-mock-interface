import { type JSX, useEffect } from "react";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { type ShieldQuadrant, useShieldsStore } from "../../stores/shields.store";
import { computeShieldSectorLayers } from "../../utils/compute-shield-sectors.util";

import "./shields-diagram.component.css";

/**
 * Renders one quadrant's three hatched arc bands, scaled to its energy
 * allocation. Renders nothing at all while the grid is lowered, the
 * quadrant is inactive, or it holds no energy allocation.
 */
function ShieldQuadrantArcs({
  quadrant,
  raised,
}: {
  quadrant: ShieldQuadrant;
  raised: boolean;
}): JSX.Element | null {
  if (!quadrant.active || !raised || quadrant.percent <= 0) return null;

  const layers = computeShieldSectorLayers(quadrant.id, quadrant.percent);

  return (
    <>
      {layers.map(
        (layer) =>
          layer.strokeWidth > 0 && <path key={layer.id} d={layer.d} fill={`url(#${layer.id})`} />,
      )}
    </>
  );
}

/**
 * Right-hand panel of the Ops console's Defence view: a top-down schematic
 * of the ship with its four shield quadrants (fore, aft, dorsal, ventral)
 * arced around the hull, sourced from {@link useShieldsStore}. Each
 * quadrant's arc hatches in three concentric bands that fill as its energy
 * allocation (set from the paired {@link ShieldsControlPanel} on the left)
 * climbs. A quadrant's arc is hidden entirely while the grid is lowered,
 * while the quadrant is inactive, or while it holds no energy allocation.
 * Below the diagram: raise/lower and regenerate controls.
 * Raising requires the reactor to have energy allocated to shields (see
 * {@link useEnergyDistributionStore}) and at least one active quadrant.
 */
export function ShieldsDiagram(): JSX.Element {
  const quadrants = useShieldsStore((state) => state.quadrants);
  const raised = useShieldsStore((state) => state.raised);
  const regenerating = useShieldsStore((state) => state.regenerating);
  const regenSecondsRemaining = useShieldsStore((state) => state.regenSecondsRemaining);
  const raiseShields = useShieldsStore((state) => state.raiseShields);
  const lowerShields = useShieldsStore((state) => state.lowerShields);
  const regenerateShields = useShieldsStore((state) => state.regenerateShields);
  const tickRegeneration = useShieldsStore((state) => state.tickRegeneration);

  const shieldEnergyPercent =
    useEnergyDistributionStore((state) => state.systems.find((system) => system.id === "shields"))
      ?.percent ?? 0;
  const isReactorOnline = useEnergyDistributionStore((state) => state.isReactorOnline);

  useEffect(() => {
    if (!regenerating) return;
    const interval = setInterval(tickRegeneration, 1000);
    return () => clearInterval(interval);
  }, [regenerating, tickRegeneration]);

  const hasActiveQuadrant = quadrants.some((quadrant) => quadrant.active);
  const hasShieldEnergy = isReactorOnline && shieldEnergyPercent > 0;
  const canRaise = hasShieldEnergy && hasActiveQuadrant;

  return (
    <div className="shields-diagram">
      <div className="shields-diagram__svg-wrap">
        <svg
          className="shields-diagram__svg"
          viewBox="82 -26 878 386"
          role="img"
          aria-label="Shield grid diagram"
        >
          <defs>
            <pattern
              id="shields-diagram-nacelle-hatch"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="8" height="8" fill="var(--color-white)" />
              <rect width="2.2" height="8" fill="var(--color-black)" />
            </pattern>
            {quadrants.flatMap((quadrant) => {
              const strength = quadrant.active && raised ? quadrant.percent : 0;
              return computeShieldSectorLayers(quadrant.id, strength).map((layer) => (
                <pattern
                  key={layer.id}
                  id={layer.id}
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <rect width="10" height="10" fill="var(--color-white)" />
                  <rect width={layer.strokeWidth} height="10" fill="var(--color-black)" />
                </pattern>
              ));
            })}
          </defs>

          <g
            stroke="var(--color-black)"
            strokeWidth="1.6"
            strokeDasharray="7 5"
            strokeLinecap="butt"
          >
            {quadrants.map((quadrant) => (
              <ShieldQuadrantArcs key={quadrant.id} quadrant={quadrant} raised={raised} />
            ))}
          </g>

          <g fill="var(--color-white)" stroke="var(--color-black)" strokeWidth="4">
            <polygon points="220,167 288,135 452,125 704,125 778,135 822,167 778,199 704,209 452,209 288,199" />
            <rect x="452" y="99" width="106" height="20" />
            <rect x="494" y="119" width="20" height="10" fill="var(--color-black)" />
            <rect x="452" y="215" width="106" height="20" />
            <rect x="494" y="205" width="20" height="10" fill="var(--color-black)" />
            <rect x="320" y="134" width="70" height="24" />
            <rect x="320" y="176" width="70" height="24" />
            <rect x="412" y="132" width="96" height="26" />
            <rect x="412" y="176" width="96" height="26" />
            <circle cx="565" cy="147" r="18" />
            <circle cx="565" cy="187" r="18" />
            <rect x="614" y="134" width="24" height="66" fill="var(--color-black)" />
            <rect x="660" y="133" width="90" height="68" />
            <circle cx="705" cy="167" r="24" />
            <rect x="288" y="162" width="534" height="10" fill="var(--color-black)" stroke="none" />
            <polygon points="660,128 690,100 770,104 785,128" />
            <rect
              x="700"
              y="108"
              width="58"
              height="12"
              fill="url(#shields-diagram-nacelle-hatch)"
            />
            <rect x="764" y="106" width="14" height="16" fill="var(--color-black)" />
            <polygon points="660,206 690,234 770,230 785,206" />
            <rect
              x="700"
              y="214"
              width="58"
              height="12"
              fill="url(#shields-diagram-nacelle-hatch)"
            />
            <rect x="764" y="212" width="14" height="16" fill="var(--color-black)" />
          </g>
        </svg>
      </div>

      {!hasShieldEnergy && (
        <p className="shields-diagram__warning">No energy allocated to shields</p>
      )}

      <div className="shields-diagram__controls">
        <button
          type="button"
          className="shields-diagram__regen-button"
          onClick={regenerateShields}
          disabled={regenerating || !hasActiveQuadrant}
        >
          {regenerating ? `Regenerating ${regenSecondsRemaining}s` : "Regenerate Shields"}
        </button>
        <button
          type="button"
          className={[
            "shields-diagram__raise-button",
            raised && "shields-diagram__raise-button--active",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={raised ? lowerShields : raiseShields}
          disabled={!raised && !canRaise}
          aria-pressed={raised}
        >
          {raised ? "Lower Shields" : "Raise Shields"}
        </button>
      </div>
    </div>
  );
}
