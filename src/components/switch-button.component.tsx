import type { JSX } from "react";

import "./switch-button.component.css";

/** Props for {@link SwitchButton}. */
export interface SwitchButtonProps {
  /** Text displayed on the switch. */
  label: string;
  /** Whether this switch is the currently active option. */
  active: boolean;
  /** Called when the captain selects this switch. */
  onSelect: () => void;
  /** Additional class name(s) applied to the root element. */
  className?: string;
}

/**
 * A single option in a mutually-exclusive group of hardware-style switches
 * (e.g. flight control mode). Renders as a filled white block when active.
 */
export function SwitchButton({
  label,
  active,
  onSelect,
  className,
}: SwitchButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={["switch-button", className].filter(Boolean).join(" ")}
      aria-pressed={active}
      data-active={active}
      onClick={onSelect}
    >
      {label}
    </button>
  );
}
