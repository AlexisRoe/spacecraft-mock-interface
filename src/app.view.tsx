import { ApplicationFrame } from "./components/application-frame.component";
import { DashboardFooter } from "./components/dashboard-footer.component";
import { DashboardHeader } from "./components/dashboard-header.component";
import { MasterCaution } from "./components/master-caution.component";
import { NavViewList } from "./components/nav-view-list.component";
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
      <ApplicationFrame.Content>
        <ApplicationFrame.Nav>
          <NavViewList />
          <MasterCaution summary="No advisories." lastAcknowledgement="09:14:02" />
        </ApplicationFrame.Nav>
        <ApplicationFrame.Article></ApplicationFrame.Article>
      </ApplicationFrame.Content>
      <ApplicationFrame.Footer>
        <DashboardFooter />
      </ApplicationFrame.Footer>
    </ApplicationFrame>
  );
}
