import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NavViewButton } from "./nav-view-button.component";

describe("NavViewButton", () => {
  it("renders the index, title, and subtitle", () => {
    render(
      <NavViewButton
        index="01"
        title="Navigation"
        subtitle="attitude · star chart"
        active
        onSelect={() => {}}
      />,
    );

    expect(screen.getByText("VIEW 01")).toBeInTheDocument();
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("attitude · star chart")).toBeInTheDocument();
  });

  it("applies the invert utility only when active", () => {
    const { rerender } = render(
      <NavViewButton index="01" title="Navigation" subtitle="" active onSelect={() => {}} />,
    );
    expect(screen.getByRole("button")).toHaveClass("color-invert");

    rerender(
      <NavViewButton
        index="01"
        title="Navigation"
        subtitle=""
        active={false}
        onSelect={() => {}}
      />,
    );
    expect(screen.getByRole("button")).not.toHaveClass("color-invert");
  });

  it("calls onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(
      <NavViewButton
        index="01"
        title="Navigation"
        subtitle=""
        active={false}
        onSelect={onSelect}
      />,
    );
    screen.getByRole("button").click();
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
