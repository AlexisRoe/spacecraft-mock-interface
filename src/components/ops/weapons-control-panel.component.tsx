import { type JSX, useEffect } from "react";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import {
  clearFireFlash,
  FIRE_FLASH_MS,
  type SalvoMode,
  useWeaponsStore,
  type WeaponStatus,
} from "../../stores/weapons.store";

import "./weapons-control-panel.component.css";

const SALVO_MODES: SalvoMode[] = ["single", "pair", "full"];
const WEAPON_STATUSES: WeaponStatus[] = ["safe", "standby", "battle"];

/**
 * Left-hand panel of the Ops console's Weapons view: target shield/hull
 * readouts for the selected contact, salvo-size and weapon-status selectors,
 * the fire-control lock control, live plasma cannon and torpedo tube status
 * cards, and the two discharge/launch fire buttons. Sourced from
 * {@link useWeaponsStore}. Firing either weapon requires an acquired lock
 * and energy allocated to weapons (see {@link useEnergyDistributionStore}) —
 * with none allocated, both fire buttons stay disabled regardless of lock or
 * charge state.
 */
export function WeaponsControlPanel(): JSX.Element {
  const targets = useWeaponsStore((state) => state.targets);
  const selectedTargetId = useWeaponsStore((state) => state.selectedTargetId);
  const lockStatus = useWeaponsStore((state) => state.lockStatus);
  const salvoMode = useWeaponsStore((state) => state.salvoMode);
  const weaponStatus = useWeaponsStore((state) => state.weaponStatus);
  const plasmaCannons = useWeaponsStore((state) => state.plasmaCannons);
  const torpedoRoundsRemaining = useWeaponsStore((state) => state.torpedoRoundsRemaining);
  const torpedoRoundsTotal = useWeaponsStore((state) => state.torpedoRoundsTotal);
  const torpedoTubesLoaded = useWeaponsStore((state) => state.torpedoTubesLoaded);
  const torpedoTubesTotal = useWeaponsStore((state) => state.torpedoTubesTotal);
  const torpedoReloadSecondsRemaining = useWeaponsStore(
    (state) => state.torpedoReloadSecondsRemaining,
  );
  const plasmaFiring = useWeaponsStore((state) => state.plasmaFiring);
  const torpedoFiring = useWeaponsStore((state) => state.torpedoFiring);
  const acquireLock = useWeaponsStore((state) => state.acquireLock);
  const tickLock = useWeaponsStore((state) => state.tickLock);
  const setSalvoMode = useWeaponsStore((state) => state.setSalvoMode);
  const setWeaponStatus = useWeaponsStore((state) => state.setWeaponStatus);
  const tickCharging = useWeaponsStore((state) => state.tickCharging);
  const firePlasmaCannon = useWeaponsStore((state) => state.firePlasmaCannon);
  const fireTorpedo = useWeaponsStore((state) => state.fireTorpedo);

  const weaponsEnergyPercent =
    useEnergyDistributionStore((state) => state.systems.find((system) => system.id === "weapons"))
      ?.percent ?? 0;
  const isReactorOnline = useEnergyDistributionStore((state) => state.isReactorOnline);
  const hasWeaponsEnergy = isReactorOnline && weaponsEnergyPercent > 0;

  const target = targets.find((candidate) => candidate.id === selectedTargetId) ?? null;
  const locked = lockStatus === "locked";
  const readyCannon = plasmaCannons.find((cannon) => cannon.status === "ready");
  const canFirePlasma = hasWeaponsEnergy && locked && Boolean(readyCannon);
  const canFireTorpedo = hasWeaponsEnergy && locked && torpedoTubesLoaded > 0;

  useEffect(() => {
    if (lockStatus !== "acquiring") return;
    const interval = setInterval(tickLock, 1000);
    return () => clearInterval(interval);
  }, [lockStatus, tickLock]);

  useEffect(() => {
    const interval = setInterval(tickCharging, 1000);
    return () => clearInterval(interval);
  }, [tickCharging]);

  useEffect(() => {
    if (!plasmaFiring) return;
    const timeout = setTimeout(() => clearFireFlash("plasma"), FIRE_FLASH_MS);
    return () => clearTimeout(timeout);
  }, [plasmaFiring]);

  useEffect(() => {
    if (!torpedoFiring) return;
    const timeout = setTimeout(() => clearFireFlash("torpedo"), FIRE_FLASH_MS);
    return () => clearTimeout(timeout);
  }, [torpedoFiring]);

  return (
    <div className="weapons-control-panel">
      <div className="weapons-control-panel__target-stats">
        <div className="weapons-control-panel__stat">
          <div className="weapons-control-panel__stat-header">
            <span>Target Shield</span>
            <span>{target ? `${target.shieldPercent}%` : "—"}</span>
          </div>
          <div className="weapons-control-panel__stat-track">
            <div
              className="weapons-control-panel__stat-fill weapons-control-panel__stat-fill--shield"
              style={{ width: `${target?.shieldPercent ?? 0}%` }}
            />
          </div>
        </div>
        <div className="weapons-control-panel__stat">
          <div className="weapons-control-panel__stat-header">
            <span>Target Hull</span>
            <span>{target ? `${target.hullPercent}%` : "—"}</span>
          </div>
          <div className="weapons-control-panel__stat-track">
            <div
              className="weapons-control-panel__stat-fill weapons-control-panel__stat-fill--hull"
              style={{ width: `${target?.hullPercent ?? 0}%` }}
            />
          </div>
        </div>
      </div>

      <div className="weapons-control-panel__segmented">
        {SALVO_MODES.map((mode) => (
          <button
            key={mode}
            type="button"
            className={[
              "weapons-control-panel__segment",
              mode === salvoMode && "weapons-control-panel__segment--selected",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={mode === salvoMode}
            onClick={() => setSalvoMode(mode)}
          >
            <span className="weapons-control-panel__segment-label">Salvo</span>
            <span className="weapons-control-panel__segment-value">{mode}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="weapons-control-panel__lock-button"
        onClick={acquireLock}
        disabled={!target || lockStatus !== "none"}
      >
        <span className="weapons-control-panel__lock-label">Fire Solution</span>
        <span className="weapons-control-panel__lock-value">
          {lockStatus === "locked"
            ? "Lock Acquired"
            : lockStatus === "acquiring"
              ? "Acquiring..."
              : "Acquire Lock"}
        </span>
      </button>

      <div className="weapons-control-panel__status-row">
        <span className="weapons-control-panel__status-label">Weapon Status</span>
        <div className="weapons-control-panel__segmented">
          {WEAPON_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              className={[
                "weapons-control-panel__status-segment",
                status === weaponStatus && "weapons-control-panel__status-segment--selected",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={status === weaponStatus}
              onClick={() => setWeaponStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="weapons-control-panel__weapons">
        {plasmaCannons.map((cannon) => (
          <div key={cannon.id} className="weapons-control-panel__weapon-card">
            <div className="weapons-control-panel__weapon-header">
              <span>{cannon.label}</span>
              <span className="weapons-control-panel__weapon-detail">{cannon.mount}</span>
            </div>
            <div className="weapons-control-panel__weapon-track">
              <div
                className="weapons-control-panel__weapon-fill"
                style={{ width: `${cannon.chargePercent}%` }}
              />
            </div>
            <div className="weapons-control-panel__weapon-footer">
              <span>{cannon.chargePercent}% Charge</span>
              <span>Cycle {cannon.cycleSeconds}s</span>
              <span>{cannon.status === "ready" ? "Ready" : "Charging"}</span>
            </div>
          </div>
        ))}

        <div className="weapons-control-panel__weapon-card">
          <div className="weapons-control-panel__weapon-header">
            <span>Torpedo Tubes</span>
            <span className="weapons-control-panel__weapon-detail">
              {torpedoRoundsRemaining} of {torpedoRoundsTotal} Rounds
            </span>
          </div>
          <div className="weapons-control-panel__weapon-track">
            <div
              className="weapons-control-panel__weapon-fill"
              style={{ width: `${(torpedoRoundsRemaining / torpedoRoundsTotal) * 100}%` }}
            />
          </div>
          <div className="weapons-control-panel__weapon-footer">
            <span>
              Tubes {torpedoTubesLoaded}/{torpedoTubesTotal} Loaded
            </span>
            <span>
              {torpedoReloadSecondsRemaining > 0
                ? `Reload 00:${String(torpedoReloadSecondsRemaining).padStart(2, "0")}`
                : "Reload —"}
            </span>
            <span>{torpedoReloadSecondsRemaining > 0 ? "Charging" : "Ready"}</span>
          </div>
        </div>
      </div>

      <div className="weapons-control-panel__fire-buttons">
        <button
          type="button"
          className={[
            "weapons-control-panel__fire-button",
            canFirePlasma && "weapons-control-panel__fire-button--armed",
            plasmaFiring && "weapons-control-panel__fire-button--firing",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => readyCannon && firePlasmaCannon(readyCannon.id)}
          disabled={!canFirePlasma}
        >
          <span className="weapons-control-panel__fire-label">Discharge</span>
          <span className="weapons-control-panel__fire-value">Plasma</span>
        </button>
        <button
          type="button"
          className={[
            "weapons-control-panel__fire-button",
            canFireTorpedo && "weapons-control-panel__fire-button--armed",
            torpedoFiring && "weapons-control-panel__fire-button--firing",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={fireTorpedo}
          disabled={!canFireTorpedo}
        >
          <span className="weapons-control-panel__fire-label">Launch</span>
          <span className="weapons-control-panel__fire-value">Torpedo</span>
        </button>
      </div>
    </div>
  );
}
