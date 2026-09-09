import type { JSX } from "react";
import { useCommsManualStore } from "../../stores/comms-manual.store";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { COMMS_FILTERS, FREQUENCY_STEP_MHZ } from "../../utils/comms-manual.util";

import "./comms-manual-panel.component.css";

/** Joins CSS class names, dropping falsy values. */
function classNames(...classes: Array<string | false>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Left-hand panel of the Communications view's manual state: master audio and
 * channel open/close, frequency tuning (nudge, scan, hold), video/audio
 * output controls, and signal filters. Every control is disabled while the
 * comms system has no power allocated from {@link useEnergyDistributionStore}.
 */
export function CommsManualPanel(): JSX.Element {
  const isMasterAudioOn = useCommsManualStore((state) => state.isMasterAudioOn);
  const isChannelOpen = useCommsManualStore((state) => state.isChannelOpen);
  const isScanning = useCommsManualStore((state) => state.isScanning);
  const isHolding = useCommsManualStore((state) => state.isHolding);
  const isVideoActive = useCommsManualStore((state) => state.isVideoActive);
  const outputMode = useCommsManualStore((state) => state.outputMode);
  const activeFilters = useCommsManualStore((state) => state.activeFilters);
  const toggleMasterAudio = useCommsManualStore((state) => state.toggleMasterAudio);
  const toggleChannel = useCommsManualStore((state) => state.toggleChannel);
  const tune = useCommsManualStore((state) => state.tune);
  const scanNext = useCommsManualStore((state) => state.scanNext);
  const toggleHold = useCommsManualStore((state) => state.toggleHold);
  const toggleVideo = useCommsManualStore((state) => state.toggleVideo);
  const setOutputMode = useCommsManualStore((state) => state.setOutputMode);
  const toggleFilter = useCommsManualStore((state) => state.toggleFilter);

  const isReactorOnline = useEnergyDistributionStore((state) => state.isReactorOnline);
  const commsPercent =
    useEnergyDistributionStore((state) => state.systems.find((system) => system.id === "comms"))
      ?.percent ?? 0;
  const hasPower = isReactorOnline && commsPercent > 0;

  return (
    <div className="comms-manual-panel">
      <div className="comms-manual-panel__section">
        <span className="comms-manual-panel__section-title">Audio</span>
        <div className="comms-manual-panel__row">
          <button
            type="button"
            className={classNames(
              "comms-manual-panel__button",
              isMasterAudioOn && "comms-manual-panel__button--active",
            )}
            aria-pressed={isMasterAudioOn}
            disabled={!hasPower}
            onClick={toggleMasterAudio}
          >
            Master Audio
          </button>
          <button
            type="button"
            className={classNames(
              "comms-manual-panel__button",
              isChannelOpen && "comms-manual-panel__button--active",
            )}
            aria-pressed={isChannelOpen}
            disabled={!hasPower}
            onClick={toggleChannel}
          >
            {isChannelOpen ? "Close Channel" : "Open Channel"}
          </button>
        </div>
      </div>

      <div className="comms-manual-panel__section">
        <span className="comms-manual-panel__section-title">Tuning</span>
        <div className="comms-manual-panel__row">
          <button
            type="button"
            className="comms-manual-panel__button"
            disabled={!hasPower || isHolding}
            onClick={() => tune(-FREQUENCY_STEP_MHZ)}
          >
            Tune Down
          </button>
          <button
            type="button"
            className="comms-manual-panel__button"
            disabled={!hasPower || isHolding}
            onClick={() => tune(FREQUENCY_STEP_MHZ)}
          >
            Tune Up
          </button>
        </div>
        <div className="comms-manual-panel__row">
          <button
            type="button"
            className={classNames(
              "comms-manual-panel__button",
              isScanning && "comms-manual-panel__button--active",
            )}
            aria-pressed={isScanning}
            disabled={!hasPower || isHolding}
            onClick={scanNext}
          >
            Scan
          </button>
          <button
            type="button"
            className={classNames(
              "comms-manual-panel__button",
              isHolding && "comms-manual-panel__button--active",
            )}
            aria-pressed={isHolding}
            disabled={!hasPower}
            onClick={toggleHold}
          >
            Hold
          </button>
        </div>
      </div>

      <div className="comms-manual-panel__section">
        <span className="comms-manual-panel__section-title">Video</span>
        <button
          type="button"
          className={classNames(
            "comms-manual-panel__button",
            isVideoActive && "comms-manual-panel__button--active",
          )}
          aria-pressed={isVideoActive}
          disabled={!hasPower}
          onClick={toggleVideo}
        >
          {isVideoActive ? "Video Active" : "Activate Video"}
        </button>
        <div className="comms-manual-panel__row">
          <button
            type="button"
            className={classNames(
              "comms-manual-panel__button",
              outputMode === "audio" && "comms-manual-panel__button--active",
            )}
            aria-pressed={outputMode === "audio"}
            disabled={!hasPower || !isVideoActive}
            onClick={() => setOutputMode("audio")}
          >
            Audio Only
          </button>
          <button
            type="button"
            className={classNames(
              "comms-manual-panel__button",
              outputMode === "audio-video" && "comms-manual-panel__button--active",
            )}
            aria-pressed={outputMode === "audio-video"}
            disabled={!hasPower || !isVideoActive}
            onClick={() => setOutputMode("audio-video")}
          >
            Audio + Video
          </button>
        </div>
      </div>

      <div className="comms-manual-panel__section comms-manual-panel__section--fill">
        <span className="comms-manual-panel__section-title">Filters</span>
        {COMMS_FILTERS.map((filter) => {
          const isActive = activeFilters.includes(filter.id);
          return (
            <button
              key={filter.id}
              type="button"
              className={classNames(
                "comms-manual-panel__button",
                isActive && "comms-manual-panel__button--active",
              )}
              aria-pressed={isActive}
              disabled={!hasPower}
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
