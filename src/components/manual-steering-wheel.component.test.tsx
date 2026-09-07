import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { ManualSteeringWheel } from "./manual-steering-wheel.component";

describe("ManualSteeringWheel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      useSpacecraftStore.setState({ manualSteeringActiveWedge: null });
    });
    vi.useRealTimers();
  });

  it("renders all eight wedge fields and the stick", () => {
    render(<ManualSteeringWheel />);
    expect(screen.getByRole("button", { name: "Roll +" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Surge +" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sway −" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Heave +" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Yaw and pitch stick" })).toBeInTheDocument();
  });

  it("keeps a wedge active while pressed, then reverts a moment after release", () => {
    render(<ManualSteeringWheel />);
    const wedge = screen.getByRole("button", { name: "Roll −" });

    fireEvent.pointerDown(wedge);
    expect(wedge).toHaveAttribute("aria-pressed", "true");

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(wedge).toHaveAttribute("aria-pressed", "true");

    fireEvent.pointerUp(wedge);
    expect(wedge).toHaveAttribute("aria-pressed", "true");

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(wedge).toHaveAttribute("aria-pressed", "false");
  });
});
