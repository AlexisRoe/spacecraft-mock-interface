import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThrustVectorPanel } from "./thrust-vector-panel.component";

describe("ThrustVectorPanel", () => {
  it("shows STBD +Y active by default and reflects it as the last impulse", () => {
    render(<ThrustVectorPanel />);
    expect(screen.getByRole("button", { name: "STBD +Y" })).toHaveClass(
      "thrust-vector-panel__button--active",
    );
    expect(screen.getAllByText("STBD +Y")).toHaveLength(2);
  });

  it("switches the active direction and last impulse readout on click", () => {
    render(<ThrustVectorPanel />);
    fireEvent.click(screen.getByRole("button", { name: "FWD +X" }));
    expect(screen.getByRole("button", { name: "FWD +X" })).toHaveClass(
      "thrust-vector-panel__button--active",
    );
    expect(screen.getByRole("button", { name: "STBD +Y" })).not.toHaveClass(
      "thrust-vector-panel__button--active",
    );
  });
});
