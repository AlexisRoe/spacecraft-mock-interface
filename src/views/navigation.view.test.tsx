import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../stores/navigation.store";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { NavigationView } from "./navigation.view";

describe("NavigationView", () => {
  afterEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Navigation, viewState: "view-state-a" });
      useSpacecraftStore.setState({
        manualFlightAction: "NULL RATES",
        manualThrustPercent: 35,
        manualThrustDirectionIndex: 3,
        manualSteeringActiveWedge: null,
      });
    });
  });

  it("renders the automatic panels by default", () => {
    render(<NavigationView />);
    expect(screen.getByRole("img", { name: "Attitude gyro compass" })).toBeInTheDocument();
    expect(screen.getByText("◄ SHIP")).toBeInTheDocument();
  });

  it("renders the manual layout with footer stats in view-state-b", () => {
    act(() => {
      useNavigationStore.setState({ viewState: "view-state-b" });
    });

    render(<NavigationView />);
    expect(screen.getByRole("button", { name: "NULL RATES" })).toHaveClass(
      "navigation-view__primary-action--active",
    );
    expect(screen.getByRole("button", { name: "ALIGN TO WAYPOINT" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Thrust" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Yaw and pitch stick" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "STBD +Y" })).toBeInTheDocument();
    expect(screen.getByText("HELM 01")).toBeInTheDocument();
  });
});
