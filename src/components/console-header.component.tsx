import type { JSX } from "react";
import { useViewState } from "../hooks/use-view-state.hook";

import "./console-header.component.css";

/** Props for {@link ConsoleHeader}. */
export interface ConsoleHeaderProps {
  /** View title displayed on the left, e.g. "Space Navigation". */
  title: string;
  /** Status text shown on the right while the view is in "view-state-a". */
  stateAStatus: string;
  /** Status text shown on the right while the view is in "view-state-b". */
  stateBStatus: string;
}

/**
 * Header bar for a {@link ConsoleGrid} view: the view title on the left and
 * a header-toggle-state-dependent status line on the right, sourced from
 * {@link useViewState}.
 */
export function ConsoleHeader({
  title,
  stateAStatus,
  stateBStatus,
}: ConsoleHeaderProps): JSX.Element {
  const { isStateA } = useViewState();
  const status = isStateA ? stateAStatus : stateBStatus;

  return (
    <div className="console-header flex-row inset-padding">
      <span className="console-header__title">{title}</span>
      <span className="console-header__status">{status}</span>
    </div>
  );
}
