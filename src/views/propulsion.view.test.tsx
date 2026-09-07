import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PropulsionView } from "./propulsion.view";

describe("PropulsionView", () => {
  it("renders the propulsion view title", () => {
    render(<PropulsionView />);
    expect(screen.getByText("Propulsion View")).toBeInTheDocument();
  });
});
