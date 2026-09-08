import type { JSX } from "react";
import { useViewState } from "../hooks/use-view-state.hook";
import { SwitchButton } from "./switch-button.component";

import "./view-state-switch.component.css";

/** Props for {@link ViewStateSwitch}. */
export interface ViewStateSwitchProps {
  /** Label describing the switch group, e.g. "View Mode". */
  groupLabel?: string;
}

/**
 * Header toggle for the active console view's two states, backed by
 * {@link useViewState}. Labels change per view, e.g. "Weapons"/"Defence" for
 * Ops or "Conventional"/"FTL" for Propulsion.
 */
export function ViewStateSwitch({ groupLabel }: ViewStateSwitchProps): JSX.Element {
  const { isStateA, labelA, labelB, selectStateA, selectStateB } = useViewState();

  return (
    <div className="view-state-switch">
      {groupLabel && <span className="view-state-switch__label">{groupLabel}</span>}
      <div className="view-state-switch__options">
        <SwitchButton label={labelA} active={isStateA} onSelect={selectStateA} />
        <SwitchButton label={labelB} active={!isStateA} onSelect={selectStateB} />
      </div>
    </div>
  );
}
