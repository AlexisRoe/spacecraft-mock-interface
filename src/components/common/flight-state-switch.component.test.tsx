import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { useSpacecraftStore } from "../../stores/spacecraft.store";
import { FlightStateSwitch } from "./flight-state-switch.component";

describe("FlightStateSwitch", () => {
  beforeEach(() => {
    useSpacecraftStore.setState({ flightState: "Cruise" });
  });

  const options = [
    { state: "Station Keep" as const, label: "Station Keep" },
    { state: "Cruise" as const, label: "Cruise" },
    { state: "Warp Prep" as const, label: "Warp Prep" },
  ];

  it("marks only the active flight state as pressed", () => {
    render(<FlightStateSwitch groupLabel="Flight State" options={options} />);

    expect(screen.getByRole("button", { name: "Cruise" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Station Keep" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByRole("button", { name: "Warp Prep" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("updates the store when a switch is clicked", async () => {
    render(<FlightStateSwitch groupLabel="Flight State" options={options} />);

    await userEvent.click(screen.getByRole("button", { name: "Warp Prep" }));

    expect(useSpacecraftStore.getState().flightState).toBe("Warp Prep");
  });
});
