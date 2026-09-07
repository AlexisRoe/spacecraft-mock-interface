import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "./app.view";
import { useSpacecraftStore } from "./stores/spacecraft.store";

function setViewport(width: number, height: number) {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: height });
}

describe("App", () => {
  afterEach(() => {
    setViewport(1024, 768);
  });

  it("renders the dashboard in landscape orientation", () => {
    setViewport(1024, 768);
    render(<App />);
    expect(screen.getByText(useSpacecraftStore.getState().shipName)).toBeInTheDocument();
    expect(screen.getByText(/Status: nominal/)).toBeInTheDocument();
  });

  it("shows the rotate notice in portrait orientation", () => {
    setViewport(400, 800);
    render(<App />);
    expect(screen.getByRole("alert")).toHaveTextContent("Rotate device to landscape");
  });
});
