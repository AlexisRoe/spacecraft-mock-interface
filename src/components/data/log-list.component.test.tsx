import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useLogConsoleStore } from "../../stores/log-console.store";
import { INITIAL_LOG_ENTRIES } from "../../utils/log-entries.util";
import { LogList } from "./log-list.component";

describe("LogList", () => {
  afterEach(() => {
    act(() => {
      useLogConsoleStore.setState({
        entries: INITIAL_LOG_ENTRIES,
        selectedId: INITIAL_LOG_ENTRIES[0]?.id ?? null,
      });
    });
  });

  it("renders every initial log entry", () => {
    render(<LogList />);
    for (const entry of INITIAL_LOG_ENTRIES) {
      expect(screen.getByText(entry.title)).toBeInTheDocument();
    }
  });

  it("filters the list by type when a tab is clicked", () => {
    render(<LogList />);
    fireEvent.click(screen.getByRole("button", { name: "Audio" }));
    expect(screen.queryByText("Bridge watch handover")).not.toBeInTheDocument();
    expect(screen.getByText("Ceres Traffic clearance")).toBeInTheDocument();
  });

  it("filters the list by a subject/content search query", () => {
    render(<LogList />);
    fireEvent.change(screen.getByLabelText("Search logs"), {
      target: { value: "turbopump" },
    });
    expect(screen.getByText("Torch S2 turbopump anomaly")).toBeInTheDocument();
    expect(screen.queryByText("Bridge watch handover")).not.toBeInTheDocument();
  });

  it("selects a log when clicked", () => {
    render(<LogList />);
    fireEvent.click(screen.getByText("Probe MK I release"));
    expect(useLogConsoleStore.getState().selectedId).toBe("vid-4471-119");
  });

  it("starts and stops a recording, only adding the log once stopped", () => {
    render(<LogList />);
    const before = useLogConsoleStore.getState().entries.length;
    const recordButton = screen.getByRole("button", { name: /Record New Log/ });

    fireEvent.click(recordButton);
    expect(useLogConsoleStore.getState().entries.length).toBe(before);
    expect(screen.getByText(/Recording In Progress/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Recording In Progress/ }));
    expect(useLogConsoleStore.getState().entries.length).toBe(before + 1);
    expect(screen.getByRole("button", { name: /Record New Log/ })).toBeInTheDocument();
  });
});
