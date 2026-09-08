import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useLogConsoleStore } from "../stores/log-console.store";
import { useNavigationStore, Views } from "../stores/navigation.store";
import { INITIAL_LOG_ENTRIES } from "../utils/log-entries.util";
import { DataConsoleView } from "./data.view";

describe("DataConsoleView", () => {
  afterEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Data, viewState: "view-state-a" });
      useLogConsoleStore.setState({
        entries: INITIAL_LOG_ENTRIES,
        selectedId: INITIAL_LOG_ENTRIES[0]?.id ?? null,
      });
    });
  });

  it("renders the logs layout by default", () => {
    const { container } = render(<DataConsoleView />);
    expect(container.querySelector(".log-list")).toBeInTheDocument();
    expect(container.querySelector(".log-detail")).toBeInTheDocument();
  });

  it("renders the code console in view-state-b", () => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Data, viewState: "view-state-b" });
    });

    const { container } = render(<DataConsoleView />);
    expect(container.querySelector(".code-editor-view")).toBeInTheDocument();
    expect(container.querySelector(".code-entry-pad")).toBeInTheDocument();
  });
});
