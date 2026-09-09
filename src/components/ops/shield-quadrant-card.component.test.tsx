import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ShieldQuadrant } from "../../stores/shields.store";
import { ShieldQuadrantCard } from "./shield-quadrant-card.component";

const ACTIVE_QUADRANT: ShieldQuadrant = {
  id: "fore",
  label: "Fore",
  percent: 60,
  active: true,
};

describe("ShieldQuadrantCard", () => {
  it("shows the quadrant's allocation while raised, matching the slider", () => {
    render(
      <ShieldQuadrantCard
        quadrant={ACTIVE_QUADRANT}
        raised={true}
        onSetAllocation={vi.fn()}
        onToggleActive={vi.fn()}
      />,
    );
    expect(screen.getByText("Fore")).toBeInTheDocument();
    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "60");
  });

  it("reads 0% while the grid is lowered, even with an active allocation", () => {
    render(
      <ShieldQuadrantCard
        quadrant={ACTIVE_QUADRANT}
        raised={false}
        onSetAllocation={vi.fn()}
        onToggleActive={vi.fn()}
      />,
    );
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "0");
  });

  it("shows OFF and a disabled slider while inactive", () => {
    render(
      <ShieldQuadrantCard
        quadrant={{ ...ACTIVE_QUADRANT, active: false, percent: 0 }}
        raised={true}
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
        raised={true}
        onSetAllocation={vi.fn()}
        onToggleActive={onToggleActive}
      />,
    );
    screen.getByRole("button", { name: "Deactivate" }).click();
    expect(onToggleActive).toHaveBeenCalledTimes(1);
  });
});
