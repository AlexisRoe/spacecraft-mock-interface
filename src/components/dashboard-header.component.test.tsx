import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useNavigationStore, Views } from "../stores/navigation.store";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { DashboardHeader } from "./dashboard-header.component";

describe("DashboardHeader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 7, 14, 7, 32));
    useSpacecraftStore.setState({
      shipName: "SCV Meridian",
      shipClass: "Survey Cutter",
      registry: "LH-4471",
      station: "Helm Station 01",
      referenceFrame: "Ecliptic J2000",
      flightState: "Cruise",
      velocityC: 0.041,
    });
    act(() => {
      useNavigationStore.setState({ activeView: Views.Navigation, viewState: "view-state-a" });
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders vessel identity and telemetry from the store", () => {
    render(<DashboardHeader />);

    expect(screen.getByText("SCV Meridian")).toBeInTheDocument();
    expect(screen.getByText("Survey Cutter · REG LH-4471 · Helm Station 01")).toBeInTheDocument();
    expect(screen.getByText("14:07:32")).toBeInTheDocument();
    expect(screen.getByText("250")).toBeInTheDocument();
    expect(screen.getByText("Ecliptic J2000")).toBeInTheDocument();
    expect(screen.getByText("Flight State (0.04c)")).toBeInTheDocument();
    expect(screen.getByText("Cruise")).toBeInTheDocument();
  });

  it("renders the active view's toggle, with labels that change per view", () => {
    render(<DashboardHeader />);
    expect(screen.getByRole("button", { name: "Automatic" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Manual" })).toBeInTheDocument();

    act(() => {
      useNavigationStore.getState().setActiveView(Views.Ops);
    });

    expect(screen.getByRole("button", { name: "Weapons" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Defence" })).toBeInTheDocument();
  });
});
