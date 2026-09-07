import { ApplicationFrame } from "./components/application-frame.component";
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
    <ApplicationFrame>
      <ApplicationFrame.Header></ApplicationFrame.Header>
      <ApplicationFrame.Content></ApplicationFrame.Content>
      <ApplicationFrame.Footer></ApplicationFrame.Footer>
    </ApplicationFrame>
  );
}
