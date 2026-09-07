import { RotateDeviceNotice } from "./components/rotate-device-notice.component";
import { useOrientation } from "./hooks/use-orientation.hook";
import { useSpacecraftStore } from "./stores/spacecraft.store";
import "./app.view.css";

/**
 * Root view of the spacecraft control interface. Enforces landscape
 * orientation and renders the placeholder captain's dashboard.
 */
export function App() {
  const { isPortrait } = useOrientation();
  const shipName = useSpacecraftStore((state) => state.shipName);
  const status = useSpacecraftStore((state) => state.status);
  const hullIntegrity = useSpacecraftStore((state) => state.hullIntegrity);

  if (isPortrait) {
    return <RotateDeviceNotice />;
  }

  return (
    <main className="app-view">
      <img
        className="app-view__crest"
        src="/icons/icon-192x192.png"
        alt="Ship crest"
        width={64}
        height={64}
      />
      <h1 className="app-view__title">{shipName}</h1>
      <p className="app-view__status">Status: {status}</p>
      <p className="app-view__hull">Hull integrity: {hullIntegrity}%</p>
    </main>
  );
}
