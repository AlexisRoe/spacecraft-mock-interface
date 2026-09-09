import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../../stores/navigation.store";
import { ActiveConsoleView } from "./active-console-view.component";

describe("ActiveConsoleView", () => {
  afterEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Navigation, viewState: "view-state-a" });
    });
  });

  it("renders the view matching the active nav item", () => {
    render(<ActiveConsoleView />);
    expect(screen.getByRole("img", { name: "Attitude gyro compass" })).toBeInTheDocument();
  });

  it("switches views when the active view changes", () => {
    render(<ActiveConsoleView />);

    act(() => {
      useNavigationStore.getState().setActiveView(Views.Propulsion);
    });

    expect(screen.getByText("Torch P1")).toBeInTheDocument();
  });
});
