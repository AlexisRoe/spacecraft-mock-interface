import type { JSX } from "react";
import { useViewState } from "../../hooks/use-view-state.hook";

import "./console-view-placeholder.component.css";

/** Props for {@link ConsoleViewPlaceholder}. */
export interface ConsoleViewPlaceholderProps {
  /** Title of the console view being displayed, e.g. "Navigation". */
  title: string;
}

/**
 * Mock content for a console view: names the view and reports the label of
 * the currently active header toggle state. Each real console view will
 * replace this with its own UI, split further by toggle state.
 */
export function ConsoleViewPlaceholder({ title }: ConsoleViewPlaceholderProps): JSX.Element {
  const { isStateA, labelA, labelB } = useViewState();

  return (
    <div className="console-view-placeholder inset-padding">
      <p className="console-view-placeholder__title">{title} View</p>
      <p className="console-view-placeholder__control-mode">State: {isStateA ? labelA : labelB}</p>
    </div>
  );
}
