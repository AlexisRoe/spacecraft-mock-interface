import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { NavView, useSpacecraftStore } from "../stores/spacecraft.store";
import { ActiveConsoleView } from "./active-console-view.component";

describe("ActiveConsoleView", () => {
  afterEach(() => {
    act(() => {
      useSpacecraftStore.setState({ activeView: NavView.Navigation });
    });
  });

  it("renders the view matching the active nav item", () => {
    render(<ActiveConsoleView />);
    expect(screen.getByRole("img", { name: "Attitude gyro compass" })).toBeInTheDocument();
  });

  it("switches views when the active view changes", () => {
    render(<ActiveConsoleView />);

    act(() => {
      useSpacecraftStore.getState().setActiveView(NavView.Propulsion);
    });

    expect(screen.getByText("Propulsion View")).toBeInTheDocument();
  });
});
