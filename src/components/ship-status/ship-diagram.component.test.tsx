import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ShipDiagram } from "./ship-diagram.component";

describe("ShipDiagram", () => {
  it("renders the ship deck plan", () => {
    render(<ShipDiagram />);
    expect(screen.getByRole("img", { name: "Ship deck plan" })).toBeInTheDocument();
  });

  it("renders no highlight overlay when nothing is selected", () => {
    const { container } = render(<ShipDiagram />);
    expect(container.querySelectorAll(".ship-diagram__highlight")).toHaveLength(0);
  });

  it("renders a single highlight overlay for the selected system", () => {
    const { container } = render(<ShipDiagram highlighted="reactor" />);
    expect(container.querySelectorAll(".ship-diagram__highlight")).toHaveLength(1);
    expect(container.querySelector(".ship-diagram__reactor .ship-diagram__highlight")).not.toBe(
      null,
    );
  });

  it("highlights all three weapon pods when weapons is selected", () => {
    const { container } = render(<ShipDiagram highlighted="weapons" />);
    expect(container.querySelectorAll(".ship-diagram__highlight")).toHaveLength(3);
  });

  it("highlights the whole hull when hull is selected", () => {
    const { container } = render(<ShipDiagram highlighted="hull" />);
    expect(container.querySelectorAll(".ship-diagram__highlight")).toHaveLength(1);
    expect(
      container.querySelector(".ship-diagram__hull-interior > .ship-diagram__highlight"),
    ).not.toBe(null);
  });
});
