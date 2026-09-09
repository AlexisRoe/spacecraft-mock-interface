import type { JSX } from "react";
import type { ShipSystemId } from "../../stores/ship-systems.store";

import "./ship-diagram.component.css";

/** Props for {@link ShipDiagram}. */
export interface ShipDiagramProps {
  /** System to highlight (inverted) on the diagram, if any. */
  highlighted?: ShipSystemId | null;
}

/** Renders an inverted overlay marking `region` as highlighted, if selected. */
function Highlight({
  region,
  highlighted,
}: {
  region: ShipSystemId;
  highlighted?: ShipSystemId | null;
}): JSX.Element | null {
  return highlighted === region ? <div className="ship-diagram__highlight" /> : null;
}

/**
 * Top-down schematic of the ship's hull: nacelles, main engine, weapon pods,
 * shield generator, docked shuttle, and interior compartments (sensors,
 * bridge, crew, life support, cargo, reactor, propulsion). Scales
 * responsively to the width of its container via a fixed aspect ratio.
 * `highlighted` inverts the corresponding compartment to mark it selected.
 */
export function ShipDiagram({ highlighted = null }: ShipDiagramProps): JSX.Element {
  return (
    <div className="ship-diagram" role="img" aria-label="Ship deck plan">
      <div className="ship-diagram__hull">
        {/* port nacelle + pylon */}
        <div className="ship-diagram__port-pylon" />
        <div className="ship-diagram__port-nacelle">
          <div className="ship-diagram__nacelle-inset">
            <div className="ship-diagram__nacelle-vent" />
            <div className="ship-diagram__nacelle-grate" />
          </div>
        </div>

        {/* starboard nacelle + pylon */}
        <div className="ship-diagram__stbd-pylon" />
        <div className="ship-diagram__stbd-nacelle">
          <div className="ship-diagram__nacelle-inset">
            <div className="ship-diagram__nacelle-vent" />
            <div className="ship-diagram__nacelle-grate" />
          </div>
        </div>

        {/* main engine bell + exhaust */}
        <div className="ship-diagram__engine">
          <div className="ship-diagram__engine-inset">
            <div className="ship-diagram__engine-exhaust" />
          </div>
        </div>

        {/* weapon pod, aft starboard */}
        <div className="ship-diagram__weapon-stub ship-diagram__weapon-stub--aft" />
        <div className="ship-diagram__weapon-pod ship-diagram__weapon-pod--aft">
          <div className="ship-diagram__weapon-barrel" />
          <Highlight region="weapons" highlighted={highlighted} />
        </div>

        {/* weapon pod, forward port */}
        <div className="ship-diagram__weapon-stub ship-diagram__weapon-stub--fwd" />
        <div className="ship-diagram__weapon-pod ship-diagram__weapon-pod--fwd">
          <div className="ship-diagram__weapon-barrel" />
          <Highlight region="weapons" highlighted={highlighted} />
        </div>

        {/* weapon pod, secondary */}
        <div className="ship-diagram__weapon-stub ship-diagram__weapon-stub--secondary" />
        <div className="ship-diagram__weapon-pod ship-diagram__weapon-pod--secondary">
          <div className="ship-diagram__weapon-barrel" />
          <Highlight region="weapons" highlighted={highlighted} />
        </div>

        {/* hull outline */}
        <div className="ship-diagram__hull-shadow" />
        <div className="ship-diagram__hull-outline">
          <div className="ship-diagram__hull-interior">
            {/* sensors & comms (bow) */}
            <div className="ship-diagram__sensors">
              <div className="ship-diagram__sensors-hatch" />
              <div className="ship-diagram__sensors-dish" />
              <Highlight region="sensors" highlighted={highlighted} />
            </div>

            {/* bridge / command */}
            <div className="ship-diagram__bridge">
              <div className="ship-diagram__bridge-chair" />
              <div className="ship-diagram__bridge-panel ship-diagram__bridge-panel--top" />
              <div className="ship-diagram__bridge-panel ship-diagram__bridge-panel--bottom" />
              <Highlight region="bridge" highlighted={highlighted} />
            </div>

            {/* crew quarters */}
            <div className="ship-diagram__crew">
              <div className="ship-diagram__crew-row">
                <div className="ship-diagram__crew-cabin" />
                <div className="ship-diagram__crew-cabin" />
                <div className="ship-diagram__crew-cabin" />
                <div className="ship-diagram__crew-cabin" />
              </div>
              <div className="ship-diagram__crew-row">
                <div className="ship-diagram__crew-cabin" />
                <div className="ship-diagram__crew-cabin" />
                <div className="ship-diagram__crew-cabin" />
                <div className="ship-diagram__crew-cabin" />
              </div>
              <Highlight region="crew" highlighted={highlighted} />
            </div>

            {/* life support & water */}
            <div className="ship-diagram__life-support">
              <div className="ship-diagram__life-support-tank ship-diagram__life-support-tank--hatched" />
              <div className="ship-diagram__life-support-tank" />
              <div className="ship-diagram__life-support-tank" />
              <div className="ship-diagram__life-support-tank ship-diagram__life-support-tank--hatched" />
              <Highlight region="lifeSupport" highlighted={highlighted} />
            </div>

            {/* cargo holds */}
            <div className="ship-diagram__cargo">
              <div className="ship-diagram__cargo-hold" />
              <div className="ship-diagram__cargo-hold" />
              <div className="ship-diagram__cargo-hold" />
              <Highlight region="cargo" highlighted={highlighted} />
            </div>

            {/* reactor & power */}
            <div className="ship-diagram__reactor">
              <div className="ship-diagram__reactor-ring">
                <div className="ship-diagram__reactor-core" />
              </div>
              <Highlight region="reactor" highlighted={highlighted} />
            </div>

            {/* propulsion / drive */}
            <div className="ship-diagram__propulsion">
              <div className="ship-diagram__propulsion-bar" />
              <div className="ship-diagram__propulsion-bar ship-diagram__propulsion-bar--hatched" />
              <div className="ship-diagram__propulsion-bar" />
              <Highlight region="propulsion" highlighted={highlighted} />
            </div>

            {/* spine corridor */}
            <div className="ship-diagram__spine" />
            <Highlight region="hull" highlighted={highlighted} />
          </div>
        </div>

        {/* docked shuttle, port side */}
        <div className="ship-diagram__dock-collar" />
        <div className="ship-diagram__shuttle">
          <div className="ship-diagram__shuttle-hull">
            <div className="ship-diagram__shuttle-inset">
              <div className="ship-diagram__shuttle-window" />
              <div className="ship-diagram__shuttle-thruster" />
            </div>
          </div>
          <Highlight region="shuttle" highlighted={highlighted} />
        </div>

        {/* airlock, starboard */}
        <div className="ship-diagram__airlock">
          <div className="ship-diagram__airlock-hatch" />
          <Highlight region="airlocks" highlighted={highlighted} />
        </div>

        {/* shield generator */}
        <div className="ship-diagram__shield-stub" />
        <div className="ship-diagram__shield">
          <div className="ship-diagram__shield-ring">
            <div className="ship-diagram__shield-core" />
          </div>
          <Highlight region="shield" highlighted={highlighted} />
        </div>
      </div>

      <span className="ship-diagram__marker ship-diagram__marker--bow">BOW</span>
      <span className="ship-diagram__marker ship-diagram__marker--stern">STERN</span>
    </div>
  );
}
