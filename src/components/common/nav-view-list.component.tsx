import type { JSX } from "react";
import { useNavigationStore, Views } from "../../stores/navigation.store";
import { NavViewButton } from "./nav-view-button.component";

import "./nav-view-list.component.css";

interface NavViewEntry {
  view: Views;
  index: string;
  title: string;
  subtitle: string;
}

const NAV_VIEW_ENTRIES: NavViewEntry[] = [
  { view: Views.Navigation, index: "01", title: "Navigation", subtitle: "attitude · star chart" },
  { view: Views.Ops, index: "02", title: "Ops", subtitle: "weapons · defence" },
  { view: Views.Propulsion, index: "03", title: "Propulsion", subtitle: "conventional · FTL" },
  {
    view: Views.Communications,
    index: "04",
    title: "Communications",
    subtitle: "manual · channels",
  },
  { view: Views.Science, index: "05", title: "Science", subtitle: "sensors · props" },
  { view: Views.Data, index: "06", title: "Data", subtitle: "logs · code" },
  { view: Views.ShipStatus, index: "07", title: "Ship Status", subtitle: "energy · overview" },
];

/** Scrollable list of the seven console view buttons. */
export function NavViewList(): JSX.Element {
  const activeView = useNavigationStore((state) => state.activeView);
  const setActiveView = useNavigationStore((state) => state.setActiveView);

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
