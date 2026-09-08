import type { JSX } from "react";

import "./nav-view-button.component.css";

/** Props for {@link NavViewButton}. */
export interface NavViewButtonProps {
  /** Two-digit view index, e.g. "01". */
  index: string;
  /** Short title of the view, e.g. "Navigation". */
  title: string;
  /** Comma/dot separated summary of the view's sections. */
  subtitle: string;
  /** Whether this is the currently selected view. */
  active: boolean;
  /** Called when the captain selects this view. */
  onSelect: () => void;
}

/** A single selectable console view entry in the nav bar. */
export function NavViewButton({
  index,
  title,
  subtitle,
  active,
  onSelect,
}: NavViewButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={["nav-view-button", active && "color-invert"].filter(Boolean).join(" ")}
      aria-pressed={active}
      onClick={onSelect}
    >
      <span className="nav-view-button__header">
        <span className="nav-view-button__indicator" />
        <span className="nav-view-button__index">VIEW {index}</span>
      </span>
      <span className="nav-view-button__title">{title}</span>
      <span className="nav-view-button__subtitle">{subtitle}</span>
    </button>
  );
}
