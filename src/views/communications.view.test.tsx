import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../stores/navigation.store";
import { CommunicationsView } from "./communications.view";

describe("CommunicationsView", () => {
  afterEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Communications, viewState: "view-state-a" });
    });
  });

  it("renders the manual layout by default", () => {
    render(<CommunicationsView />);
    expect(screen.getByText("Manual View")).toBeInTheDocument();
    expect(screen.getByText("Spectrum View")).toBeInTheDocument();
  });

  it("renders the channels layout in view-state-b", () => {
    act(() => {
      useNavigationStore.setState({
        activeView: Views.Communications,
        viewState: "view-state-b",
      });
    });

    render(<CommunicationsView />);
    expect(screen.getByText("Channel Control")).toBeInTheDocument();
    expect(screen.getByText("Hailing Frequency")).toBeInTheDocument();
  });
});
