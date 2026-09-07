import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { DashboardFooter } from "./dashboard-footer.component";

describe("DashboardFooter", () => {
  beforeEach(() => {
    useSpacecraftStore.setState({ flightState: "Cruise" });
  });

  it("renders the three flight state options", () => {
    render(<DashboardFooter />);

    expect(screen.getByRole("button", { name: "Station Keep" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cruise" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Warp Prep" })).toBeInTheDocument();
  });

  it("marks the active flight state as pressed", () => {
    render(<DashboardFooter />);

    expect(screen.getByRole("button", { name: "Cruise" })).toHaveAttribute("aria-pressed", "true");
  });
});
