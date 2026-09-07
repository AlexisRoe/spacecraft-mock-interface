import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { NavigationView } from "./navigation.view";

describe("NavigationView", () => {
  afterEach(() => {
    act(() => {
      useSpacecraftStore.setState({ controlMode: "autopilot" });
    });
  });

  it("renders the autopilot panels by default", () => {
    render(<NavigationView />);
    expect(screen.getByRole("img", { name: "Attitude gyro compass" })).toBeInTheDocument();
    expect(screen.getAllByText(/^Param \d+$/)).toHaveLength(8);
  });

  it("renders the placeholder in manual mode", () => {
    act(() => {
      useSpacecraftStore.setState({ controlMode: "manual" });
    });

    render(<NavigationView />);
    expect(screen.getByText("Navigation View")).toBeInTheDocument();
  });
});
