import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Torch } from "../../stores/propulsion.store";
import { TorchCard } from "./torch-card.component";

const TORCH: Torch = {
  id: "p1",
  label: "Torch P1",
  percent: 62,
  nozzleK: 2810,
  ispS: 9400,
  pumpRpm: 18_200,
  gimbal: "+0.4°",
  status: "online",
  hoursSinceService: 612,
};

describe("TorchCard", () => {
  it("renders the torch's readings", () => {
    render(<TorchCard torch={TORCH} selected={false} onSelect={vi.fn()} />);
    expect(screen.getByText("Torch P1")).toBeInTheDocument();
    expect(screen.getByText("62%")).toBeInTheDocument();
    expect(screen.getByText("ONLINE")).toBeInTheDocument();
  });

  it("marks itself pressed when selected", () => {
    render(<TorchCard torch={TORCH} selected onSelect={vi.fn()} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onSelect when clicked", async () => {
    const onSelect = vi.fn();
    render(<TorchCard torch={TORCH} selected={false} onSelect={onSelect} />);
    screen.getByRole("button").click();
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
