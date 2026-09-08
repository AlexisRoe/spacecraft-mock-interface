import { ActiveConsoleView } from "./components/common/active-console-view.component";
import { ApplicationFrame } from "./components/common/application-frame.component";
import { DashboardFooter } from "./components/common/dashboard-footer.component";
import { DashboardHeader } from "./components/common/dashboard-header.component";
import { MasterCaution } from "./components/common/master-caution.component";
import { NavViewList } from "./components/common/nav-view-list.component";
import { RotateDeviceNotice } from "./components/common/rotate-device-notice.component";
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
        <ApplicationFrame.Article>
          <ActiveConsoleView />
        </ApplicationFrame.Article>
      </ApplicationFrame.Content>
      <ApplicationFrame.Footer>
        <DashboardFooter />
      </ApplicationFrame.Footer>
    </ApplicationFrame>
  );
}
