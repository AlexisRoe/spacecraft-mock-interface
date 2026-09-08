import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../../stores/navigation.store";
import { ViewStateSwitch } from "./view-state-switch.component";

describe("ViewStateSwitch", () => {
  beforeEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Ops, viewState: "view-state-a" });
    });
  });

  it("renders the active view's state labels", () => {
    render(<ViewStateSwitch />);
    expect(screen.getByRole("button", { name: "Weapons" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Defence" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("switches the view state in the store on select", () => {
    render(<ViewStateSwitch />);
    screen.getByRole("button", { name: "Defence" }).click();
    expect(useNavigationStore.getState().viewState).toBe("view-state-b");
  });

  it("renders an optional group label", () => {
    render(<ViewStateSwitch groupLabel="View Mode" />);
    expect(screen.getByText("View Mode")).toBeInTheDocument();
  });
});
