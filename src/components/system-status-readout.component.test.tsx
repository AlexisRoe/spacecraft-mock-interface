import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { SystemStatusReadout } from "./system-status-readout.component";

describe("SystemStatusReadout", () => {
  beforeEach(() => {
    useSpacecraftStore.setState({
      status: "nominal",
      reactorOutputMw: 412,
      shieldIntegrity: 94,
    });
  });

  it("renders status, reactor output, and shield integrity", () => {
    render(<SystemStatusReadout />);

    expect(screen.getByText("All Systems Nominal")).toBeInTheDocument();
    expect(screen.getByText("Reactor 412 MW")).toBeInTheDocument();
    expect(screen.getByText("Shield 94%")).toBeInTheDocument();
  });

  it("reflects an updated shield integrity value", () => {
    useSpacecraftStore.setState({ shieldIntegrity: 67 });
    render(<SystemStatusReadout />);

    expect(screen.getByText("Shield 67%")).toBeInTheDocument();
  });
});
