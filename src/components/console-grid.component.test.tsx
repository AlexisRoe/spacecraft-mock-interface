import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConsoleGrid } from "./console-grid.component";

describe("ConsoleGrid", () => {
  it("renders header, left, and right content", () => {
    render(
      <ConsoleGrid>
        <ConsoleGrid.Header>Header</ConsoleGrid.Header>
        <ConsoleGrid.Left>Left</ConsoleGrid.Left>
        <ConsoleGrid.Right>Right</ConsoleGrid.Right>
      </ConsoleGrid>,
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });
});
