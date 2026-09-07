import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { ThrustDialer } from "./thrust-dialer.component";

describe("ThrustDialer", () => {
  afterEach(() => {
    act(() => {
      useSpacecraftStore.setState({ manualThrustPercent: 35 });
    });
  });

  it("shows the default thrust value", () => {
    render(<ThrustDialer />);
    expect(screen.getByText("35%")).toBeInTheDocument();
  });

  it("sets the value from a tap position on the scale", () => {
    render(<ThrustDialer />);
    const bar = screen.getByRole("slider", { name: "Thrust" });
    vi.spyOn(bar, "getBoundingClientRect").mockReturnValue({
      top: 0,
      bottom: 200,
      height: 200,
      left: 0,
      right: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON() {},
    });

    fireEvent.click(bar, { clientY: 50 });
    expect(screen.getByText("75%")).toBeInTheDocument();
  });
});
