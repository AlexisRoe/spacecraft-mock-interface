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
    expect(screen.getByText("Reactor Output")).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Drive" })).toBeInTheDocument();
  });

  it("renders the systems overview layout in view-state-b", () => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.ShipStatus, viewState: "view-state-b" });
    });

    render(<ShipStatusView />);
    expect(screen.getByRole("img", { name: "Ship deck plan" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reactor & Power/ })).toBeInTheDocument();
  });
});
