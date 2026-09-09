import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../stores/navigation.store";
import { OpsView } from "./ops.view";

describe("OpsView", () => {
  afterEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Ops, viewState: "view-state-a" });
    });
  });

  it("renders the weapons layout by default", () => {
    render(<OpsView />);
    expect(screen.getByText("Target Shield")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Targeting grid" })).toBeInTheDocument();
  });

  it("renders the defence layout in view-state-b", () => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Ops, viewState: "view-state-b" });
    });

    render(<OpsView />);
    expect(screen.getByText("Fore")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Raise Shields" })).toBeInTheDocument();
  });
});
