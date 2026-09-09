import type { JSX } from "react";
import { useCommsConsoleStore } from "../../stores/comms-console.store";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";

import "./channel-control-panel.component.css";

/**
 * Left-hand panel of the Communications view's channels state: selection and
 * power-dependent open/close controls for the {@link ChannelGrid}, an
 * encryption toggle for the comm officer, and a status readout. Every
 * control is disabled while the comms system has no power allocated from
 * {@link useEnergyDistributionStore}.
 */
export function ChannelControlPanel(): JSX.Element {
  const channels = useCommsConsoleStore((state) => state.channels);
  const selectedChannelIds = useCommsConsoleStore((state) => state.selectedChannelIds);
  const isEncryptionEnabled = useCommsConsoleStore((state) => state.isEncryptionEnabled);
  const selectAllChannels = useCommsConsoleStore((state) => state.selectAllChannels);
  const clearSelection = useCommsConsoleStore((state) => state.clearSelection);
  const openChannels = useCommsConsoleStore((state) => state.openChannels);
  const closeChannels = useCommsConsoleStore((state) => state.closeChannels);
  const toggleEncryption = useCommsConsoleStore((state) => state.toggleEncryption);

  const isReactorOnline = useEnergyDistributionStore((state) => state.isReactorOnline);
  const commsPercent =
    useEnergyDistributionStore((state) => state.systems.find((system) => system.id === "comms"))
      ?.percent ?? 0;
  const hasPower = isReactorOnline && commsPercent > 0;

  const allChannelIds = channels.map((channel) => channel.id);
  const openCount = channels.filter((channel) => channel.status === "open").length;
  const hasSelection = selectedChannelIds.length > 0;

  return (
    <div className="channel-control-panel">
      <div className="channel-control-panel__section">
        <span className="channel-control-panel__section-title">Selection</span>
        <div className="channel-control-panel__row">
          <button
            type="button"
            className="channel-control-panel__button"
            disabled={!hasPower}
            onClick={selectAllChannels}
          >
            Select All
          </button>
          <button
            type="button"
            className="channel-control-panel__button"
            disabled={!hasPower || !hasSelection}
            onClick={clearSelection}
          >
            Clear Selection
          </button>
        </div>
      </div>

      <div className="channel-control-panel__section">
        <span className="channel-control-panel__section-title">Channel Control</span>
        <button
          type="button"
          className="channel-control-panel__action"
          disabled={!hasPower || !hasSelection}
          onClick={() => openChannels(selectedChannelIds)}
        >
          Open Selected
        </button>
        <button
          type="button"
          className="channel-control-panel__action"
          disabled={!hasPower || !hasSelection}
          onClick={() => closeChannels(selectedChannelIds)}
        >
          Close Selected
        </button>
        <div className="channel-control-panel__row">
          <button
            type="button"
            className="channel-control-panel__button"
            disabled={!hasPower}
            onClick={() => openChannels(allChannelIds)}
          >
            Open All
          </button>
          <button
            type="button"
            className="channel-control-panel__button"
            disabled={!hasPower}
            onClick={() => closeChannels(allChannelIds)}
          >
            Close All
          </button>
        </div>
      </div>

      <div className="channel-control-panel__section">
        <span className="channel-control-panel__section-title">Officer Controls</span>
        <button
          type="button"
          className={[
            "channel-control-panel__button",
            isEncryptionEnabled && "channel-control-panel__button--active",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-pressed={isEncryptionEnabled}
          disabled={!hasPower}
          onClick={toggleEncryption}
        >
          {isEncryptionEnabled ? "Encryption On" : "Encryption Off"}
        </button>
      </div>

      <div className="channel-control-panel__status">
        <span className="channel-control-panel__status-title">
          {hasPower ? "Comms Online" : "Comms Offline"}
        </span>
        <span className="channel-control-panel__status-subtitle">
          {hasPower
            ? `${openCount}/${channels.length} Open · ${selectedChannelIds.length} Selected`
            : "Allocate reactor power to comms"}
        </span>
      </div>
    </div>
  );
}
