import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../../stores/navigation.store";
import { ConsoleHeader } from "./console-header.component";

describe("ConsoleHeader", () => {
  afterEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Navigation, viewState: "view-state-a" });
    });
  });

  it("renders the title and view-state-a status by default", () => {
    render(
      <ConsoleHeader
        title="Space Navigation"
        stateAStatus="Autopilot following plotted course"
        stateBStatus="Direct law · RCS + main drive"
      />,
    );

    expect(screen.getByText("Space Navigation")).toBeInTheDocument();
    expect(screen.getByText("Autopilot following plotted course")).toBeInTheDocument();
  });

  it("shows the view-state-b status when the view is toggled", () => {
    act(() => {
      useNavigationStore.getState().setViewState("view-state-b");
    });

    render(
      <ConsoleHeader
        title="Space Navigation"
        stateAStatus="Autopilot following plotted course"
        stateBStatus="Direct law · RCS + main drive"
      />,
    );

    expect(screen.getByText("Direct law · RCS + main drive")).toBeInTheDocument();
  });
});
