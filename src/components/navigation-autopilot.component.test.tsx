import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  NavigationAutopilotLeft,
  NavigationAutopilotRight,
} from "./navigation-autopilot.component";

describe("NavigationAutopilotLeft", () => {
  it("renders 3 + 3 + 4 parameter cells", () => {
    render(<NavigationAutopilotLeft />);
    expect(screen.getAllByText(/^Param \d+$/)).toHaveLength(10);
  });
});

describe("NavigationAutopilotRight", () => {
  it("renders 4 + 4 parameter cells", () => {
    render(<NavigationAutopilotRight />);
    expect(screen.getAllByText(/^Param \d+$/)).toHaveLength(8);
  });
});
