import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  NavigationAutopilotLeft,
  NavigationAutopilotRight,
} from "./navigation-autopilot.component";

describe("NavigationAutopilotLeft", () => {
  it("renders the gyro compass, attitude readouts and command switches", () => {
    render(<NavigationAutopilotLeft />);
    expect(screen.getByRole("img", { name: "Attitude gyro compass" })).toBeInTheDocument();
    expect(screen.getByText("214.6°")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "FREE" })).toHaveAttribute("aria-pressed", "true");
  });

  it("switches the active attitude command and updates the readouts", () => {
    render(<NavigationAutopilotLeft />);

    fireEvent.click(screen.getByRole("button", { name: "RETROGRADE" }));

    expect(screen.getByRole("button", { name: "RETROGRADE" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "FREE" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("034.6°")).toBeInTheDocument();
  });
});

describe("NavigationAutopilotRight", () => {
  it("renders 4 + 4 parameter cells", () => {
    render(<NavigationAutopilotRight />);
    expect(screen.getAllByText(/^Param \d+$/)).toHaveLength(8);
  });
});
