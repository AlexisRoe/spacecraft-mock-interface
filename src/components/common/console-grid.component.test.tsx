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

  it("renders header, primary, secondary, tertiary and footer content in manual variant", () => {
    const { container } = render(
      <ConsoleGrid variant="manual">
        <ConsoleGrid.Header>Header</ConsoleGrid.Header>
        <ConsoleGrid.Primary>Primary</ConsoleGrid.Primary>
        <ConsoleGrid.Secondary>Secondary</ConsoleGrid.Secondary>
        <ConsoleGrid.Tertiary>Tertiary</ConsoleGrid.Tertiary>
        <ConsoleGrid.Footer>Footer</ConsoleGrid.Footer>
      </ConsoleGrid>,
    );

    expect(container.querySelector(".console-grid--manual")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Primary")).toBeInTheDocument();
    expect(screen.getByText("Secondary")).toBeInTheDocument();
    expect(screen.getByText("Tertiary")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toHaveClass("console-grid__footer");
  });

  it("renders header and content in full variant", () => {
    const { container } = render(
      <ConsoleGrid variant="full">
        <ConsoleGrid.Header>Header</ConsoleGrid.Header>
        <ConsoleGrid.Content>Content</ConsoleGrid.Content>
      </ConsoleGrid>,
    );

    expect(container.querySelector(".console-grid--full")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Content")).toHaveClass("console-grid__content");
  });
});
