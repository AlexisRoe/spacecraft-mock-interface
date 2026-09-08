import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../stores/navigation.store";
import { PropulsionView } from "./propulsion.view";

describe("PropulsionView", () => {
  afterEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Propulsion, viewState: "view-state-a" });
    });
  });

  it("renders the conventional layout by default", () => {
    render(<PropulsionView />);
    expect(screen.getByText("Conventional View")).toBeInTheDocument();
    expect(screen.getByText("Reactor View")).toBeInTheDocument();
  });

  it("renders the FTL layout in view-state-b", () => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Propulsion, viewState: "view-state-b" });
    });

    render(<PropulsionView />);
    expect(screen.getByText("FTL View")).toBeInTheDocument();
    expect(screen.getByText("Warp Field View")).toBeInTheDocument();
  });
});
