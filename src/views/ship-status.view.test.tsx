import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ShipStatusView } from "./ship-status.view";

describe("ShipStatusView", () => {
  it("renders the ship status view title", () => {
    render(<ShipStatusView />);
    expect(screen.getByText("Ship Status View")).toBeInTheDocument();
  });
});
