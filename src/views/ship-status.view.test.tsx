import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../stores/navigation.store";
import { ShipStatusView } from "./ship-status.view";

describe("ShipStatusView", () => {
  afterEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.ShipStatus, viewState: "view-state-a" });
    });
  });

  it("renders the energy layout by default", () => {
    render(<ShipStatusView />);
    expect(screen.getByText("Energy View")).toBeInTheDocument();
    expect(screen.getByText("Reactor Grid View")).toBeInTheDocument();
  });

  it("renders the overview layout in view-state-b", () => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.ShipStatus, viewState: "view-state-b" });
    });

    render(<ShipStatusView />);
    expect(screen.getByText("Overview View")).toBeInTheDocument();
    expect(screen.getByText("Life Support View")).toBeInTheDocument();
  });
});
