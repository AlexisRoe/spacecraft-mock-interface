import type { JSX, KeyboardEvent, MouseEvent } from "react";
import { type FieldGeometry, useFtlDriveStore } from "../../stores/ftl-drive.store";
import { computeFtlPerformance } from "../../utils/compute-ftl-performance.util";

import "./ftl-control-panel.component.css";

const FIELD_GEOMETRIES: { id: FieldGeometry; label: string }[] = [
  { id: "symmetric", label: "Symmetric" },
  { id: "asymmetric", label: "Asymmetric" },
  { id: "subspace", label: "Subspace" },
];

/** Sets `setValue` from a horizontal pointer position within `event`'s target. */
function setFromPointer(
  event: MouseEvent<HTMLDivElement>,
  setValue: (value: number) => void,
): void {
  const rect = event.currentTarget.getBoundingClientRect();
  const ratio = (event.clientX - rect.left) / rect.width;
  setValue(Math.round(Math.min(100, Math.max(0, ratio * 100))));
}

/** Nudges `value` up or down by one on arrow key presses, via `setValue`. */
function nudgeOnArrowKeys(
  event: KeyboardEvent<HTMLDivElement>,
  value: number,
  setValue: (value: number) => void,
): void {
  if (event.key === "ArrowRight" || event.key === "ArrowUp") {
    setValue(Math.min(100, value + 1));
  } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
    setValue(Math.max(0, value - 1));
  }
}

/**
 * Left-hand panel of the Propulsion console's FTL view: sliders for the
 * matter/antimatter intermix ratio, antimatter injector rate, and subspace
 * field strength; an auto-balance shortcut; a field geometry selector; and
 * a bank of live core readouts — all sourced from {@link useFtlDriveStore}.
 * The engage/disengage and flash-coils controls live in the paired
 * {@link FtlDiagram} panel on the right.
 */
export function FtlControlPanel(): JSX.Element {
  const intermixRatio = useFtlDriveStore((state) => state.intermixRatio);
  const fieldStrength = useFtlDriveStore((state) => state.fieldStrength);
  const fieldGeometry = useFtlDriveStore((state) => state.fieldGeometry);
  const injectorRate = useFtlDriveStore((state) => state.injectorRate);
  const coilFlashCount = useFtlDriveStore((state) => state.coilFlashCount);
  const setIntermixRatio = useFtlDriveStore((state) => state.setIntermixRatio);
  const balanceIntermix = useFtlDriveStore((state) => state.balanceIntermix);
  const setFieldStrength = useFtlDriveStore((state) => state.setFieldStrength);
  const setFieldGeometry = useFtlDriveStore((state) => state.setFieldGeometry);
  const setInjectorRate = useFtlDriveStore((state) => state.setInjectorRate);

  const {
    energyOutputPercent,
    lightspeedFactor,
    coreTemperatureK,
    containmentIntegrityPercent,
    subspaceDistortionIndex,
  } = computeFtlPerformance(intermixRatio, fieldStrength);

  return (
    <div className="ftl-control-panel">
      <div className="ftl-control-panel__section">
        <div className="ftl-control-panel__row-label">
          <span>Intermix Ratio</span>
          <span>{`${intermixRatio}% M · ${100 - intermixRatio}% AM`}</span>
        </div>
        <div className="ftl-control-panel__slider-row">
          <div
            className="ftl-control-panel__slider"
            onClick={(event) => setFromPointer(event, setIntermixRatio)}
            onKeyDown={(event) => nudgeOnArrowKeys(event, intermixRatio, setIntermixRatio)}
            role="slider"
            tabIndex={0}
            aria-label="Intermix ratio"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={intermixRatio}
          >
            <div
              className="ftl-control-panel__slider-fill"
              style={{ width: `${intermixRatio}%` }}
            />
          </div>
          <button
            type="button"
            className="ftl-control-panel__balance-button"
            onClick={balanceIntermix}
          >
            Balance
          </button>
        </div>
      </div>

      <div className="ftl-control-panel__section">
        <div className="ftl-control-panel__row-label">
          <span>Antimatter Injector Rate</span>
          <span>{`${injectorRate} g/h`}</span>
        </div>
        <div
          className="ftl-control-panel__slider"
          onClick={(event) => setFromPointer(event, setInjectorRate)}
          onKeyDown={(event) => nudgeOnArrowKeys(event, injectorRate, setInjectorRate)}
          role="slider"
          tabIndex={0}
          aria-label="Antimatter injector rate"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={injectorRate}
        >
          <div className="ftl-control-panel__slider-fill" style={{ width: `${injectorRate}%` }} />
        </div>
      </div>

      <div className="ftl-control-panel__section">
        <div className="ftl-control-panel__row-label">
          <span>Field Strength</span>
          <span>{`${fieldStrength} ${fieldStrength === 1 ? "cochrane" : "cochranes"}`}</span>
        </div>
        <div
          className="ftl-control-panel__slider"
          onClick={(event) => setFromPointer(event, setFieldStrength)}
          onKeyDown={(event) => nudgeOnArrowKeys(event, fieldStrength, setFieldStrength)}
          role="slider"
          tabIndex={0}
          aria-label="Field strength"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={fieldStrength}
        >
          <div className="ftl-control-panel__slider-fill" style={{ width: `${fieldStrength}%` }} />
        </div>
      </div>

      <div className="ftl-control-panel__section">
        <div className="ftl-control-panel__row-label">
          <span>Field Geometry</span>
        </div>
        <div className="ftl-control-panel__geometry-buttons">
          {FIELD_GEOMETRIES.map((geometry) => (
            <button
              key={geometry.id}
              type="button"
              className={[
                "ftl-control-panel__geometry-button",
                geometry.id === fieldGeometry && "ftl-control-panel__geometry-button--active",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={geometry.id === fieldGeometry}
              onClick={() => setFieldGeometry(geometry.id)}
            >
              {geometry.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ftl-control-panel__readouts">
        <div className="ftl-control-panel__readout">
          <span className="ftl-control-panel__readout-label">Energy Output</span>
          <span className="ftl-control-panel__readout-value">
            {`${energyOutputPercent.toFixed(0)}%`}
          </span>
        </div>
        <div className="ftl-control-panel__readout">
          <span className="ftl-control-panel__readout-label">Lightspeed Factor</span>
          <span className="ftl-control-panel__readout-value">{`×${lightspeedFactor.toFixed(2)}`}</span>
        </div>
        <div className="ftl-control-panel__readout">
          <span className="ftl-control-panel__readout-label">Core Temperature</span>
          <span className="ftl-control-panel__readout-value">
            {`${coreTemperatureK.toFixed(0)} K`}
          </span>
        </div>
        <div className="ftl-control-panel__readout">
          <span className="ftl-control-panel__readout-label">Containment Integrity</span>
          <span className="ftl-control-panel__readout-value">
            {`${containmentIntegrityPercent.toFixed(0)}%`}
          </span>
        </div>
        <div className="ftl-control-panel__readout">
          <span className="ftl-control-panel__readout-label">Subspace Distortion</span>
          <span className="ftl-control-panel__readout-value">
            {subspaceDistortionIndex.toFixed(0)}
          </span>
        </div>
        <div className="ftl-control-panel__readout">
          <span className="ftl-control-panel__readout-label">Coil Flash Cycles</span>
          <span className="ftl-control-panel__readout-value">{coilFlashCount}</span>
        </div>
      </div>
    </div>
  );
}
