import type { JSX } from "react";
import { useSpacecraftStore } from "../stores/spacecraft.store";

import "./console-view-placeholder.component.css";

/** Props for {@link ConsoleViewPlaceholder}. */
export interface ConsoleViewPlaceholderProps {
  /** Title of the console view being displayed, e.g. "Navigation". */
  title: string;
}

/**
 * Mock content for a console view: names the view and reports the currently
 * selected control mode. Each real console view will replace this with its
 * own UI, split further by control mode.
 */
export function ConsoleViewPlaceholder({ title }: ConsoleViewPlaceholderProps): JSX.Element {
  const controlMode = useSpacecraftStore((state) => state.controlMode);

  return (
    <div className="console-view-placeholder inset-padding">
      <p className="console-view-placeholder__title">{title} View</p>
      <p className="console-view-placeholder__control-mode">Control Mode: {controlMode}</p>
    </div>
  );
}
