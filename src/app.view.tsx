import { ApplicationFrame } from "./components/application-frame.component";
import { DashboardHeader } from "./components/dashboard-header.component";
import { RotateDeviceNotice } from "./components/rotate-device-notice.component";
import { useOrientation } from "./hooks/use-orientation.hook";

/**
 * Root view of the spacecraft control interface. Enforces landscape
 * orientation and renders the captain's dashboard.
 */
export function App() {
  const { isPortrait } = useOrientation();

  if (isPortrait) {
    return <RotateDeviceNotice />;
  }

  return (
    <ApplicationFrame>
      <ApplicationFrame.Header>
        <DashboardHeader />
      </ApplicationFrame.Header>
      <ApplicationFrame.Content></ApplicationFrame.Content>
      <ApplicationFrame.Footer></ApplicationFrame.Footer>
    </ApplicationFrame>
  );
}
