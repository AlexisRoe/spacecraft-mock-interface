import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { useShieldsStore } from "../../stores/shields.store";
import { ShieldsDiagram } from "./shields-diagram.component";

const INITIAL_QUADRANTS = useShieldsStore.getState().quadrants;
const INITIAL_SYSTEMS = useEnergyDistributionStore.getState().systems;

describe("ShieldsDiagram", () => {
  afterEach(() => {
    act(() => {
      useShieldsStore.setState({
        quadrants: INITIAL_QUADRANTS,
        raised: false,
        regenerating: false,
        regenSecondsRemaining: 0,
      });
      useEnergyDistributionStore.setState({ systems: INITIAL_SYSTEMS, isReactorOnline: true });
    });
  });

  it("renders the ship diagram", () => {
    render(<ShieldsDiagram />);
    expect(screen.getByRole("img", { name: "Shield grid diagram" })).toBeInTheDocument();
  });

  it("raises the shields when the reactor has shield energy allocated", () => {
    render(<ShieldsDiagram />);
    const raiseButton = screen.getByRole("button", { name: "Raise Shields" });
    expect(raiseButton).not.toBeDisabled();

    act(() => raiseButton.click());
    expect(useShieldsStore.getState().raised).toBe(true);
    expect(screen.getByRole("button", { name: "Lower Shields" })).toBeInTheDocument();
  });

  it("disables raising shields when no energy is allocated to shields", () => {
    act(() => {
      useEnergyDistributionStore.setState((state) => ({
        systems: state.systems.map((system) =>
          system.id === "shields" ? { ...system, percent: 0 } : system,
        ),
      }));
    });

    render(<ShieldsDiagram />);
    expect(screen.getByRole("button", { name: "Raise Shields" })).toBeDisabled();
    expect(screen.getByText("No energy allocated to shields")).toBeInTheDocument();
  });

  it("starts a regeneration cycle when the regenerate button is clicked", () => {
    render(<ShieldsDiagram />);
    screen.getByRole("button", { name: "Regenerate Shields" }).click();
    expect(useShieldsStore.getState().regenerating).toBe(true);
  });
});
