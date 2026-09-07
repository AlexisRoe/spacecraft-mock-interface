import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { NavigationView } from "./navigation.view";

describe("NavigationView", () => {
  afterEach(() => {
    act(() => {
      useSpacecraftStore.setState({ controlMode: "autopilot" });
    });
  });

  it("renders the autopilot panels by default", () => {
    render(<NavigationView />);
    expect(screen.getByRole("img", { name: "Attitude gyro compass" })).toBeInTheDocument();
    expect(screen.getByText("◄ SHIP")).toBeInTheDocument();
  });

  it("renders the manual layout with footer stats in manual mode", () => {
    act(() => {
      useSpacecraftStore.setState({ controlMode: "manual" });
    });

    render(<NavigationView />);
    expect(screen.getByRole("button", { name: "NULL RATES" })).toHaveClass(
      "navigation-view__primary-action--active",
    );
    expect(screen.getByRole("button", { name: "ALIGN TO WAYPOINT" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Thrust" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "STBD +Y" })).toBeInTheDocument();
    expect(screen.getByText("HELM 01")).toBeInTheDocument();
  });
});
