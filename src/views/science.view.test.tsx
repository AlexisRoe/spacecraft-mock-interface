import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../stores/navigation.store";
import { ScienceView } from "./science.view";

describe("ScienceView", () => {
  afterEach(() => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Science, viewState: "view-state-a" });
    });
  });

  it("renders the sensors layout by default", () => {
    render(<ScienceView />);
    expect(screen.getByText("Gravimetric Array")).toBeInTheDocument();
    expect(screen.getByText("Magnetometer Array")).toBeInTheDocument();
    expect(screen.getByLabelText("Sensor phase field plot")).toBeInTheDocument();
  });

  it("renders the props layout in view-state-b", () => {
    act(() => {
      useNavigationStore.setState({ activeView: Views.Science, viewState: "view-state-b" });
    });

    render(<ScienceView />);
    expect(screen.getByText("Props View")).toBeInTheDocument();
    expect(screen.getByText("Probes View")).toBeInTheDocument();
  });
});
