import type { JSX } from "react";
import type { FlightState } from "../../stores/spacecraft.store";
import { useSpacecraftStore } from "../../stores/spacecraft.store";
import { SwitchButton } from "./switch-button.component";

import "./flight-state-switch.component.css";

/** A single selectable flight state option and its display label. */
export interface FlightStateOption {
  /** Flight state this option activates. */
  state: FlightState;
  /** Text displayed on the switch for this option. */
  label: string;
}

/** Props for {@link FlightStateSwitch}. */
export interface FlightStateSwitchProps {
  /** Label describing the group of switches, e.g. "Flight State". */
  groupLabel: string;
  /** Options to render as mutually-exclusive switches. */
  options: FlightStateOption[];
}

/**
 * Group of mutually-exclusive flight state switches, backed by the
 * spacecraft store's active {@link FlightState}. Only one switch is active
 * at a time. Options/labels are configurable per view.
 */
export function FlightStateSwitch({ groupLabel, options }: FlightStateSwitchProps): JSX.Element {
  const flightState = useSpacecraftStore((state) => state.flightState);
  const setFlightState = useSpacecraftStore((state) => state.setFlightState);

  return (
    <div className="flight-state-switch">
      <span className="flight-state-switch__label">{groupLabel}</span>
      <div className="flight-state-switch__options">
        {options.map((option) => (
          <SwitchButton
            key={option.state}
            className="flight-state-switch__button"
            label={option.label}
            active={flightState === option.state}
            onSelect={() => setFlightState(option.state)}
          />
        ))}
      </div>
    </div>
  );
}
