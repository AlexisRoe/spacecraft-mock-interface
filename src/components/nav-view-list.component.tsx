import type { JSX } from "react";
import { NavView, useSpacecraftStore } from "../stores/spacecraft.store";
import { NavViewButton } from "./nav-view-button.component";

import "./nav-view-list.component.css";

interface NavViewEntry {
  view: NavView;
  index: string;
  title: string;
  subtitle: string;
}

const NAV_VIEW_ENTRIES: NavViewEntry[] = [
  { view: NavView.Navigation, index: "01", title: "Navigation", subtitle: "attitude · star chart" },
  { view: NavView.Propulsion, index: "02", title: "Propulsion", subtitle: "engines · reactor" },
  {
    view: NavView.FieldsFtl,
    index: "03",
    title: "Fields & FTL",
    subtitle: "warp · aperture · shields",
  },
  {
    view: NavView.Communications,
    index: "04",
    title: "Communications",
    subtitle: "spectrum · channels · audio",
  },
  { view: NavView.Defence, index: "05", title: "Defence", subtitle: "shields · energy grid" },
  {
    view: NavView.FireControl,
    index: "06",
    title: "Fire Control",
    subtitle: "target lock · engage",
  },
  { view: NavView.ShipStatus, index: "07", title: "Ship Status", subtitle: "life support · log" },
  {
    view: NavView.Science,
    index: "08",
    title: "Science",
    subtitle: "probes · sensors · particles",
  },
  { view: NavView.Logs, index: "09", title: "Logs", subtitle: "records · database search" },
];

/** Scrollable list of the nine console view buttons. */
export function NavViewList(): JSX.Element {
  const activeView = useSpacecraftStore((state) => state.activeView);
  const setActiveView = useSpacecraftStore((state) => state.setActiveView);

  return (
    <div className="nav-view-list">
      {NAV_VIEW_ENTRIES.map((entry) => (
        <NavViewButton
          key={entry.view}
          index={entry.index}
          title={entry.title}
          subtitle={entry.subtitle}
          active={activeView === entry.view}
          onSelect={() => setActiveView(entry.view)}
        />
      ))}
    </div>
  );
}
