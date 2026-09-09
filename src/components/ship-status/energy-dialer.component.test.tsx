import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EnergyDialer } from "./energy-dialer.component";

describe("EnergyDialer", () => {
  it("shows the label and current value", () => {
    render(<EnergyDialer label="Drive" value={30} onChange={() => {}} />);

    expect(screen.getByText("Drive")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
  });

  it("calls onChange with the value from a tap position on the scale", () => {
    const onChange = vi.fn();
    render(<EnergyDialer label="Drive" value={30} onChange={onChange} />);

    const bar = screen.getByRole("slider", { name: "Drive" });
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

    expect(onChange).toHaveBeenCalledWith(75);
  });

  it("nudges the value with arrow keys", () => {
    const onChange = vi.fn();
    render(<EnergyDialer label="Drive" value={30} onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole("slider", { name: "Drive" }), { key: "ArrowUp" });
    expect(onChange).toHaveBeenCalledWith(31);
  });

  it("reads 0% and ignores input while disabled", () => {
    const onChange = vi.fn();
    render(<EnergyDialer label="Drive" value={30} onChange={onChange} disabled />);

    const bar = screen.getByRole("slider", { name: "Drive" });
    expect(bar).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByText("0%")).toBeInTheDocument();

    fireEvent.keyDown(bar, { key: "ArrowUp" });
    fireEvent.click(bar, { clientY: 50 });
    expect(onChange).not.toHaveBeenCalled();
  });
});
