import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ManualSteeringWheel } from "./manual-steering-wheel.component";

describe("ManualSteeringWheel", () => {
  it("renders all eight wedge fields and the stick", () => {
    render(<ManualSteeringWheel />);
    expect(screen.getByRole("button", { name: "Roll +" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Surge +" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sway −" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Heave +" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Yaw and pitch stick" })).toBeInTheDocument();
  });

  it("marks a wedge active when clicked", () => {
    render(<ManualSteeringWheel />);
    const wedge = screen.getByRole("button", { name: "Roll −" });
    fireEvent.click(wedge);
    expect(wedge).toHaveAttribute("aria-pressed", "true");
  });
});
