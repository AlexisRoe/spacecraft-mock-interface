import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { CodeEditorView } from "../components/data/code-editor-view.component";
import { CodeEntryPad } from "../components/data/code-entry-pad.component";
import { LogDetail } from "../components/data/log-detail.component";
import { LogList } from "../components/data/log-list.component";
import { useViewState } from "../hooks/use-view-state.hook";

/** Data console view: records/logs (view-state-a) and code (view-state-b). */
export function DataConsoleView(): JSX.Element {
  const { isStateA } = useViewState();

  return (
    <ConsoleGrid>
      <ConsoleGrid.Header>
        <ConsoleHeader
          title="Data"
          stateAStatus="Log stream live"
          stateBStatus="Code console ready"
        />
      </ConsoleGrid.Header>
      <ConsoleGrid.Left>{isStateA ? <LogList /> : <CodeEditorView />}</ConsoleGrid.Left>
      <ConsoleGrid.Right>{isStateA ? <LogDetail /> : <CodeEntryPad />}</ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
