import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { NavViewList } from "./nav-view-list.component";

describe("NavViewList", () => {
  it("renders all nine console views", () => {
    render(<NavViewList />);
    expect(screen.getAllByRole("button")).toHaveLength(9);
  });

  it("marks the active view and switches on click", () => {
    render(<NavViewList />);
    expect(screen.getByRole("button", { name: /Navigation/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    screen.getByRole("button", { name: /Propulsion/ }).click();
    expect(useSpacecraftStore.getState().activeView).toBe("propulsion");
  });
});
