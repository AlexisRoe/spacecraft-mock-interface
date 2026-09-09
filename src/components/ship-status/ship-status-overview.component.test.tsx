import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useShipSystemsStore } from "../../stores/ship-systems.store";
import { ShipStatusOverview } from "./ship-status-overview.component";

describe("ShipStatusOverview", () => {
  afterEach(() => {
    act(() => {
      useShipSystemsStore.setState({ selectedSystem: null });
    });
  });

  it("renders the ship diagram and a button for every system", () => {
    render(<ShipStatusOverview />);

    expect(screen.getByRole("img", { name: "Ship deck plan" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(
      useShipSystemsStore.getState().systems.length,
    );
  });

  it("highlights the diagram region and activates the button for the clicked system", () => {
    const { container } = render(<ShipStatusOverview />);

    fireEvent.click(screen.getByRole("button", { name: /Reactor & Power/ }));

    expect(screen.getByRole("button", { name: /Reactor & Power/ })).toHaveClass(
      "ship-system-panel__button--active",
    );
    expect(container.querySelector(".ship-diagram__reactor .ship-diagram__highlight")).not.toBe(
      null,
    );
  });

  it("clears the highlight when the active button is clicked again", () => {
    const { container } = render(<ShipStatusOverview />);
    const button = screen.getByRole("button", { name: /Reactor & Power/ });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).not.toHaveClass("ship-system-panel__button--active");
    expect(container.querySelectorAll(".ship-diagram__highlight")).toHaveLength(0);
  });
});
