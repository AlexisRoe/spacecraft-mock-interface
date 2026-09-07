import type { JSX } from "react";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { NAV_VIEW_COMPONENTS } from "../utils/nav-view-registry.util";

/** Renders the console view matching the currently selected nav item. */
export function ActiveConsoleView(): JSX.Element {
  const activeView = useSpacecraftStore((state) => state.activeView);
  const ViewComponent = NAV_VIEW_COMPONENTS[activeView];

  return <ViewComponent />;
}
