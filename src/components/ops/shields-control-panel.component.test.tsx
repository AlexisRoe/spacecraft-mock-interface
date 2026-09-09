import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useShieldsStore } from "../../stores/shields.store";
import { ShieldsControlPanel } from "./shields-control-panel.component";

const INITIAL_QUADRANTS = useShieldsStore.getState().quadrants;

describe("ShieldsControlPanel", () => {
  afterEach(() => {
    act(() => {
      useShieldsStore.setState({ quadrants: INITIAL_QUADRANTS, raised: false });
    });
  });

  it("renders a card for each of the four quadrants", () => {
    render(<ShieldsControlPanel />);
    expect(screen.getByText("Fore")).toBeInTheDocument();
    expect(screen.getByText("Aft")).toBeInTheDocument();
    expect(screen.getByText("Dorsal")).toBeInTheDocument();
    expect(screen.getByText("Ventral")).toBeInTheDocument();
  });

  it("deactivates a quadrant and redistributes its energy when its button is clicked", () => {
    render(<ShieldsControlPanel />);
    screen.getAllByRole("button", { name: "Deactivate" })[0].click();

    const { quadrants } = useShieldsStore.getState();
    const inactiveCount = quadrants.filter((quadrant) => !quadrant.active).length;
    expect(inactiveCount).toBe(1);
    expect(quadrants.reduce((sum, quadrant) => sum + quadrant.percent, 0)).toBe(100);
  });

  it("distributes energy evenly when the distribute button is clicked", () => {
    render(<ShieldsControlPanel />);
    act(() => useShieldsStore.getState().setAllocation("fore", 70));

    act(() => screen.getByRole("button", { name: "Distribute Energy Evenly" }).click());

    expect(useShieldsStore.getState().quadrants.every((quadrant) => quadrant.percent === 25)).toBe(
      true,
    );
  });

  it("reports raised status in the status card", () => {
    render(<ShieldsControlPanel />);
    expect(screen.getByText("Lowered")).toBeInTheDocument();

    act(() => useShieldsStore.getState().raiseShields());
    expect(screen.getByText("Raised")).toBeInTheDocument();
  });
});
