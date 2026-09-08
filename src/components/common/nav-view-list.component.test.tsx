import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useNavigationStore } from "../../stores/navigation.store";
import { NavViewList } from "./nav-view-list.component";

describe("NavViewList", () => {
  it("renders all seven console views", () => {
    render(<NavViewList />);
    expect(screen.getAllByRole("button")).toHaveLength(7);
  });

  it("marks the active view and switches on click", () => {
    render(<NavViewList />);
    expect(screen.getByRole("button", { name: /Navigation/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    screen.getByRole("button", { name: /Propulsion/ }).click();
    expect(useNavigationStore.getState().activeView).toBe("propulsion");
  });
});
