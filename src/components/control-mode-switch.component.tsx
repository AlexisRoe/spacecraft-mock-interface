import type { JSX } from "react";
import type { ControlMode } from "../stores/spacecraft.store";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { SwitchButton } from "./switch-button.component";

import "./control-mode-switch.component.css";

/** A single selectable control mode option and its display label. */
export interface ControlModeOption {
  /** Control mode this option activates. */
  mode: ControlMode;
  /** Text displayed on the switch for this option. */
  label: string;
}

/** Props for {@link ControlModeSwitch}. */
export interface ControlModeSwitchProps {
  /** Label describing the group of switches, e.g. "Control". */
  groupLabel: string;
  /** Options to render as mutually-exclusive switches. */
  options: ControlModeOption[];
}

/**
 * Group of mutually-exclusive control mode switches, backed by the
 * spacecraft store's active {@link ControlMode}. Only one switch is active
 * at a time. Options/labels are configurable per view.
 */
export function ControlModeSwitch({ groupLabel, options }: ControlModeSwitchProps): JSX.Element {
  const controlMode = useSpacecraftStore((state) => state.controlMode);
  const setControlMode = useSpacecraftStore((state) => state.setControlMode);

  return (
    <div className="control-mode-switch">
      <span className="control-mode-switch__label">{groupLabel}</span>
      <div className="control-mode-switch__options">
        {options.map((option) => (
          <SwitchButton
            key={option.mode}
            label={option.label}
            active={controlMode === option.mode}
            onSelect={() => setControlMode(option.mode)}
          />
        ))}
      </div>
    </div>
  );
}
