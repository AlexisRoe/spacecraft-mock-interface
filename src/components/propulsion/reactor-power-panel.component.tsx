import type { JSX } from "react";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import {
  LOAD_PROFILE_PRESETS,
  type LoadProfile,
  usePropulsionStore,
} from "../../stores/propulsion.store";
import { useSpacecraftStore } from "../../stores/spacecraft.store";
import { TokamakGauge } from "./tokamak-gauge.component";

import "./reactor-power-panel.component.css";

const LOAD_PROFILES: { id: LoadProfile; label: string }[] = [
  { id: "balanced", label: "Balanced" },
  { id: "drive", label: "Drive" },
  { id: "shields", label: "Shields" },
  { id: "survey", label: "Survey" },
];

/**
 * Right-hand panel of the Propulsion console's conventional drive view: the
 * reactor's total output, a tokamak core gauge, the reactor bus allocation
 * across ship systems, and a set of load-profile presets, sourced from
 * {@link useSpacecraftStore} and {@link useEnergyDistributionStore}.
 * Selecting a load profile applies its preset allocation to every bus via
 * {@link useEnergyDistributionStore.setAllocation}.
 */
export function ReactorPowerPanel(): JSX.Element {
  const reactorOutputMw = useSpacecraftStore((state) => state.reactorOutputMw);
  const isReactorOnline = useEnergyDistributionStore((state) => state.isReactorOnline);
  const systems = useEnergyDistributionStore((state) => state.systems);
  const setAllocation = useEnergyDistributionStore((state) => state.setAllocation);
  const loadProfile = usePropulsionStore((state) => state.loadProfile);
  const setLoadProfile = usePropulsionStore((state) => state.setLoadProfile);

  const outputPercent = isReactorOnline ? 99 : 0;

  function applyLoadProfile(profile: LoadProfile): void {
    setLoadProfile(profile);
    const preset = LOAD_PROFILE_PRESETS[profile];
    for (const system of systems) {
      setAllocation(system.id, preset[system.id]);
    }
  }

  return (
    <div className="reactor-power-panel">
      <div className="reactor-power-panel__core">
        <TokamakGauge percent={outputPercent} />
        <div>
          <div className="reactor-power-panel__core-label">Tokamak Core</div>
          <div className="reactor-power-panel__core-value">{outputPercent}% Output</div>
          <div className="reactor-power-panel__core-sub">
            {`Reactor ${reactorOutputMw} MW · ${isReactorOnline ? "Confinement stable" : "Confinement offline"}`}
          </div>
        </div>
      </div>
      <div className="reactor-power-panel__bus">
        <div className="reactor-power-panel__bus-label">Bus Allocation</div>
        {systems.map((system) => {
          const percent = isReactorOnline ? system.percent : 0;
          return (
            <div className="reactor-power-panel__bus-row" key={system.id}>
              <div className="reactor-power-panel__bus-row-top">
                <span>{system.label}</span>
                <span>{percent}%</span>
              </div>
              <div className="reactor-power-panel__bus-track">
                <div className="reactor-power-panel__bus-fill" style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="reactor-power-panel__profiles">
        {LOAD_PROFILES.map((profile) => (
          <button
            key={profile.id}
            type="button"
            className={[
              "reactor-power-panel__profile-button",
              profile.id === loadProfile && "reactor-power-panel__profile-button--active",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={profile.id === loadProfile}
            onClick={() => applyLoadProfile(profile.id)}
          >
            <span className="reactor-power-panel__profile-caption">Load Profile</span>
            <span className="reactor-power-panel__profile-name">{profile.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
