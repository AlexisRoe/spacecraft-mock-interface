import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { ConsoleViewPlaceholder } from "./console-view-placeholder.component";

describe("ConsoleViewPlaceholder", () => {
  afterEach(() => {
    act(() => {
      useSpacecraftStore.setState({ controlMode: "autopilot" });
    });
  });

  it("renders the view title", () => {
    render(<ConsoleViewPlaceholder title="Navigation" />);
    expect(screen.getByText("Navigation View")).toBeInTheDocument();
  });

  it("reports the current control mode", () => {
    render(<ConsoleViewPlaceholder title="Navigation" />);
    expect(screen.getByText(/Control Mode: autopilot/)).toBeInTheDocument();
  });

  it("updates when the control mode changes", () => {
    render(<ConsoleViewPlaceholder title="Navigation" />);

    act(() => {
      useSpacecraftStore.getState().setControlMode("manual");
    });

    expect(screen.getByText(/Control Mode: manual/)).toBeInTheDocument();
  });
});
