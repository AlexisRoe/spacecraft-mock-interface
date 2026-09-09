import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ShieldQuadrant } from "../../stores/shields.store";
import { ShieldQuadrantCard } from "./shield-quadrant-card.component";

const ACTIVE_QUADRANT: ShieldQuadrant = {
  id: "fore",
  label: "Fore",
  percent: 25,
  chargePercent: 87,
  active: true,
};

describe("ShieldQuadrantCard", () => {
  it("shows the quadrant's label, allocation, and charge", () => {
    render(
      <ShieldQuadrantCard
        quadrant={ACTIVE_QUADRANT}
        onSetAllocation={vi.fn()}
        onToggleActive={vi.fn()}
      />,
    );
    expect(screen.getByText("Fore")).toBeInTheDocument();
    expect(screen.getByText("87%")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("shows OFF and a disabled slider while inactive", () => {
    render(
      <ShieldQuadrantCard
        quadrant={{ ...ACTIVE_QUADRANT, active: false, percent: 0 }}
        onSetAllocation={vi.fn()}
        onToggleActive={vi.fn()}
      />,
    );
    expect(screen.getByText("OFF")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-disabled", "true");
  });

  it("calls onToggleActive when the toggle button is clicked", () => {
    const onToggleActive = vi.fn();
    render(
      <ShieldQuadrantCard
        quadrant={ACTIVE_QUADRANT}
        onSetAllocation={vi.fn()}
        onToggleActive={onToggleActive}
      />,
    );
    screen.getByRole("button", { name: "Deactivate" }).click();
    expect(onToggleActive).toHaveBeenCalledTimes(1);
  });
});
