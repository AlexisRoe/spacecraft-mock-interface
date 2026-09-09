import type { JSX } from "react";
import { useCommsConsoleStore } from "../../stores/comms-console.store";

import "./channel-grid.component.css";

/**
 * Right-hand panel of the Communications view's channels state: a grid of
 * every external and internal channel. Clicking a tile toggles its
 * membership in the selection the {@link ChannelControlPanel} acts on;
 * selected tiles render inverted (black fill, white text).
 */
export function ChannelGrid(): JSX.Element {
  const channels = useCommsConsoleStore((state) => state.channels);
  const selectedChannelIds = useCommsConsoleStore((state) => state.selectedChannelIds);
  const toggleChannelSelection = useCommsConsoleStore((state) => state.toggleChannelSelection);

  return (
    <div className="channel-grid">
      {channels.map((channel) => {
        const isSelected = selectedChannelIds.includes(channel.id);
        return (
          <button
            key={channel.id}
            type="button"
            className={["channel-grid__tile", isSelected && "channel-grid__tile--active"]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={isSelected}
            onClick={() => toggleChannelSelection(channel.id)}
          >
            <span className="channel-grid__tile-header">
              <span className="channel-grid__tile-kind">{channel.kind}</span>
              <span
                className={[
                  "channel-grid__tile-status",
                  channel.status === "open" && "channel-grid__tile-status--open",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {channel.status}
              </span>
            </span>
            <span className="channel-grid__tile-label">{channel.label}</span>
            <span className="channel-grid__tile-frequency">{channel.frequency}</span>
          </button>
        );
      })}
    </div>
  );
}
