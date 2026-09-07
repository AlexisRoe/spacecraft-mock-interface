import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThrustDialer } from "./thrust-dialer.component";

describe("ThrustDialer", () => {
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
