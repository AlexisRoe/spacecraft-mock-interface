import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { usePropulsionStore } from "../../stores/propulsion.store";
import { TorchClusterPanel } from "./torch-cluster-panel.component";

describe("TorchClusterPanel", () => {
  afterEach(() => {
    act(() => {
      usePropulsionStore.setState({ selectedTorchId: "s1", burnActive: false, burnSeconds: 0 });
    });
  });

  it("renders all four torches and the fuel gauge", () => {
    render(<TorchClusterPanel />);
    expect(screen.getByText("Torch P1")).toBeInTheDocument();
    expect(screen.getByText("Torch S2")).toBeInTheDocument();
    expect(screen.getByText("Deuterium Slush")).toBeInTheDocument();
  });

  it("selects a torch when its card is clicked", () => {
    render(<TorchClusterPanel />);
    screen.getByText("Torch P2").closest("button")?.click();
    expect(usePropulsionStore.getState().selectedTorchId).toBe("p2");
  });

  it("starts a burn when the burn button is clicked", () => {
    render(<TorchClusterPanel />);
    screen.getByText("Start Burn").click();
    expect(usePropulsionStore.getState().burnActive).toBe(true);
  });
});
