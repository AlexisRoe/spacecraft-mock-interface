import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../stores/navigation.store";
import { DataConsoleView } from "./data.view";

describe("DataConsoleView", () => {
  afterEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Data, viewState: "view-state-a" });
    });
  });

  it("renders the logs layout by default", () => {
    render(<DataConsoleView />);
    expect(screen.getByText("Logs View")).toBeInTheDocument();
    expect(screen.getByText("Database Search View")).toBeInTheDocument();
  });

  it("renders the code layout in view-state-b", () => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Data, viewState: "view-state-b" });
    });

    render(<DataConsoleView />);
    expect(screen.getByText("Code View")).toBeInTheDocument();
    expect(screen.getByText("Diagnostics View")).toBeInTheDocument();
  });
});
