import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { ConsoleHeader } from "./console-header.component";

describe("ConsoleHeader", () => {
  afterEach(() => {
    act(() => {
      useSpacecraftStore.setState({ controlMode: "autopilot" });
    });
  });

  it("renders the title and autopilot status by default", () => {
    render(
      <ConsoleHeader
        title="Space Navigation"
        autopilotStatus="Autopilot following plotted course"
        manualStatus="Direct law · RCS + main drive"
      />,
    );

    expect(screen.getByText("Space Navigation")).toBeInTheDocument();
    expect(screen.getByText("Autopilot following plotted course")).toBeInTheDocument();
  });

  it("shows the manual status when control mode is manual", () => {
    act(() => {
      useSpacecraftStore.setState({ controlMode: "manual" });
    });

    render(
      <ConsoleHeader
        title="Space Navigation"
        autopilotStatus="Autopilot following plotted course"
        manualStatus="Direct law · RCS + main drive"
      />,
    );

    expect(screen.getByText("Direct law · RCS + main drive")).toBeInTheDocument();
  });
});
