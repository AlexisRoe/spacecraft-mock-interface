import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useLogConsoleStore } from "../../stores/log-console.store";
import { INITIAL_LOG_ENTRIES } from "../../utils/log-entries.util";
import { LogDetail } from "./log-detail.component";

describe("LogDetail", () => {
  afterEach(() => {
    act(() => {
      useLogConsoleStore.setState({
        entries: INITIAL_LOG_ENTRIES,
        selectedId: INITIAL_LOG_ENTRIES[0]?.id ?? null,
      });
    });
  });

  it("shows the selected text log's full content", () => {
    act(() => {
      useLogConsoleStore.getState().selectLog("log-4471-3310");
    });
    render(<LogDetail />);
    expect(screen.getByText("Torch S2 turbopump anomaly")).toBeInTheDocument();
    expect(screen.getByText(/Survey of the Keid Branch corridor/)).toBeInTheDocument();
  });

  it("shows a play control for a video log", () => {
    act(() => {
      useLogConsoleStore.getState().selectLog("vid-4471-118");
    });
    const { container } = render(<LogDetail />);
    expect(container.querySelector(".log-detail__media--video")).toBeInTheDocument();
  });

  it("shows a waveform for an audio log", () => {
    act(() => {
      useLogConsoleStore.getState().selectLog("aud-4471-902");
    });
    const { container } = render(<LogDetail />);
    expect(container.querySelector(".log-detail__media--audio")).toBeInTheDocument();
  });

  it("does nothing when update or delete is clicked", () => {
    render(<LogDetail />);
    const before = useLogConsoleStore.getState();
    fireEvent.click(screen.getByRole("button", { name: /Update/ }));
    fireEvent.click(screen.getByRole("button", { name: /Delete/ }));
    expect(useLogConsoleStore.getState()).toEqual(before);
  });
});
