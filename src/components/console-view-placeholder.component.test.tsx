import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../stores/navigation.store";
import { ConsoleViewPlaceholder } from "./console-view-placeholder.component";

describe("ConsoleViewPlaceholder", () => {
  afterEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Navigation, viewState: "view-state-a" });
    });
  });

  it("renders the view title", () => {
    render(<ConsoleViewPlaceholder title="Navigation" />);
    expect(screen.getByText("Navigation View")).toBeInTheDocument();
  });

  it("reports the current view state label", () => {
    render(<ConsoleViewPlaceholder title="Navigation" />);
    expect(screen.getByText(/State: Automatic/)).toBeInTheDocument();
  });

  it("updates when the view state changes", () => {
    render(<ConsoleViewPlaceholder title="Navigation" />);

    act(() => {
      useNavigationStore.getState().setViewState("view-state-b");
    });

    expect(screen.getByText(/State: Manual/)).toBeInTheDocument();
  });
});
