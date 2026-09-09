import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { ReactorShutdownButton } from "./reactor-shutdown-button.component";

describe("ReactorShutdownButton", () => {
  afterEach(() => {
    act(() => {
      useEnergyDistributionStore.setState({ isReactorOnline: true });
    });
  });

  it("shows 'Emergency Shutdown' while the reactor is online", () => {
    render(<ReactorShutdownButton />);
    expect(screen.getByRole("button", { name: "Emergency Shutdown" })).toBeInTheDocument();
  });

  it("shuts the reactor down and flips to 'Restart Reactor' when clicked", () => {
    render(<ReactorShutdownButton />);

    fireEvent.click(screen.getByRole("button", { name: "Emergency Shutdown" }));

    expect(useEnergyDistributionStore.getState().isReactorOnline).toBe(false);
    expect(screen.getByRole("button", { name: "Restart Reactor" })).toBeInTheDocument();
  });

  it("restarts the reactor and flips back when clicked again", () => {
    render(<ReactorShutdownButton />);

    fireEvent.click(screen.getByRole("button", { name: "Emergency Shutdown" }));
    fireEvent.click(screen.getByRole("button", { name: "Restart Reactor" }));

    expect(useEnergyDistributionStore.getState().isReactorOnline).toBe(true);
    expect(screen.getByRole("button", { name: "Emergency Shutdown" })).toBeInTheDocument();
  });
});
