import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SwitchButton } from "./switch-button.component";

describe("SwitchButton", () => {
  it("renders the label and reflects the active state", () => {
    render(<SwitchButton label="Autopilot" active onSelect={() => {}} />);
    const button = screen.getByRole("button", { name: "Autopilot" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveClass("color-invert");
  });

  it("does not apply the invert utility when inactive", () => {
    render(<SwitchButton label="Manual" active={false} onSelect={() => {}} />);
    expect(screen.getByRole("button", { name: "Manual" })).not.toHaveClass("color-invert");
  });

  it("calls onSelect when clicked", async () => {
    const onSelect = vi.fn();
    render(<SwitchButton label="Manual" active={false} onSelect={onSelect} />);
    screen.getByRole("button", { name: "Manual" }).click();
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
