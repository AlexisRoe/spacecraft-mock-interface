import type { JSX } from "react";
import { useProbeConsoleStore } from "../../stores/probe-console.store";
import { calculateTelemetryLoad, type ProbeSweepMode } from "../../utils/probe-deployment.util";

import "./probe-deployment-panel.component.css";

/** Sweep mode options offered in the control panel, in display order. */
const SWEEP_MODES: Array<{ value: ProbeSweepMode; label: string }> = [
  { value: "continuous", label: "Continuous" },
  { value: "stepped", label: "Stepped" },
  { value: "parked", label: "Parked" },
];

/**
 * Left-hand panel of the Science view's probes state: the roster of probe
 * bays, deploy/recall control for the selected bay, its sensor-sweep mode,
 * and a science-bus/storage load readout.
 */
export function ProbeDeploymentPanel(): JSX.Element {
  const bays = useProbeConsoleStore((state) => state.bays);
  const selectedBayId = useProbeConsoleStore((state) => state.selectedBayId);
  const deployProbe = useProbeConsoleStore((state) => state.deployProbe);
  const destroyProbe = useProbeConsoleStore((state) => state.destroyProbe);
  const setSweepMode = useProbeConsoleStore((state) => state.setSweepMode);

  const selectedBay = bays.find((bay) => bay.id === selectedBayId) ?? null;
  const load = calculateTelemetryLoad(bays);

  return (
    <div className="probe-deployment-panel">
      <div className="probe-deployment-panel__list">
        {bays.map((bay) => (
          <div key={bay.id} className="probe-deployment-panel__bay">
            <span className="probe-deployment-panel__bay-header">
              <span className="probe-deployment-panel__bay-label">{bay.bayLabel}</span>
            </span>
            <span className="probe-deployment-panel__bay-name">{bay.name}</span>
            <span className="probe-deployment-panel__bay-designation">{bay.designation}</span>
            <span className="probe-deployment-panel__bay-summary">{bay.readySummary}</span>
          </div>
        ))}
      </div>

      {selectedBay ? (
        <div className="probe-deployment-panel__status">
          <span className="probe-deployment-panel__status-title">
            {selectedBay.status === "deployed" ? "Sweep Active" : "Sweep Inactive"}
          </span>
          <span className="probe-deployment-panel__status-subtitle">
            {selectedBay.status === "deployed"
              ? selectedBay.deployedSummary
              : "Deploy the probe to enable its sensor sweep"}
          </span>
        </div>
      ) : null}

      {selectedBay ? (
        <div className="probe-deployment-panel__control">
          <button
            type="button"
            className="probe-deployment-panel__action"
            onClick={() =>
              selectedBay.status === "deployed"
                ? destroyProbe(selectedBay.id)
                : deployProbe(selectedBay.id)
            }
          >
            <span className="probe-deployment-panel__action-text">
              <span className="probe-deployment-panel__action-context">
                {`${selectedBay.bayLabel} · ${selectedBay.name}`}
              </span>
              <span className="probe-deployment-panel__action-label">
                {selectedBay.status === "deployed" ? "Destroy Probe" : "Deploy Probe"}
              </span>
              <span className="probe-deployment-panel__action-hint">
                {selectedBay.status === "deployed"
                  ? "Recalls and safes the probe, freeing the bay"
                  : "Releases the probe and begins its sweep"}
              </span>
            </span>
            <span
              className={[
                "probe-deployment-panel__action-indicator",
                selectedBay.status === "deployed" &&
                  "probe-deployment-panel__action-indicator--deployed",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden="true"
            />
          </button>

          <div className="probe-deployment-panel__sweep">
            <span className="probe-deployment-panel__sweep-title">Sensor Sweep</span>
            <div className="probe-deployment-panel__sweep-modes">
              {SWEEP_MODES.map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  className={[
                    "probe-deployment-panel__sweep-mode",
                    selectedBay.sweepMode === mode.value &&
                      "probe-deployment-panel__sweep-mode--active",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-pressed={selectedBay.sweepMode === mode.value}
                  disabled={selectedBay.status !== "deployed"}
                  onClick={() => setSweepMode(selectedBay.id, mode.value)}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="probe-deployment-panel__stats">
        <span>{`Science Bus ${load.busPercent}%`}</span>
        <span>{`Sample ${load.samplePeriodSeconds.toFixed(1)}s`}</span>
        <span>{`Store ${load.storeFreePercent}% Free`}</span>
      </div>
    </div>
  );
}
