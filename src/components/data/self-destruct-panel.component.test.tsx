import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCodeConsoleStore } from "../../stores/code-console.store";
import { SelfDestructPanel } from "./self-destruct-panel.component";

describe("SelfDestructPanel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    act(() => {
      useCodeConsoleStore.setState({ program: [], selfDestructActive: false });
    });
  });

  it("renders the terminal warning, timer, and abort phrase", () => {
    render(<SelfDestructPanel />);
    expect(screen.getByText("> 25s")).toBeInTheDocument();
    expect(screen.getByText('"abort"')).toBeInTheDocument();
  });

  it("shows rubbish feedback and does not abort on an isolated click", () => {
    act(() => {
      useCodeConsoleStore.setState({ selfDestructActive: true, program: ["055"] });
    });
    render(<SelfDestructPanel />);
    fireEvent.click(screen.getByText('"abort"'));
    expect(document.querySelector(".self-destruct-panel__line--rubbish")).not.toBeNull();
    expect(useCodeConsoleStore.getState().selfDestructActive).toBe(true);
  });

  it("aborts and resets the program after three rapid clicks", () => {
    act(() => {
      useCodeConsoleStore.setState({ selfDestructActive: true, program: ["055"] });
    });
    render(<SelfDestructPanel />);
    const abortPhrase = screen.getByText('"abort"');
    fireEvent.click(abortPhrase);
    fireEvent.click(abortPhrase);
    expect(useCodeConsoleStore.getState().selfDestructActive).toBe(true);
    fireEvent.click(abortPhrase);
    expect(useCodeConsoleStore.getState().selfDestructActive).toBe(false);
    expect(useCodeConsoleStore.getState().program).toEqual([]);
  });

  it("jumps the countdown back up instead of reaching zero", () => {
    render(<SelfDestructPanel />);
    act(() => {
      for (let i = 0; i < 20; i += 1) {
        vi.advanceTimersByTime(1000);
      }
    });
    const timerText = screen.getByText(/> \d+s/).textContent ?? "";
    const remaining = Number.parseInt(timerText.replace(/\D/g, ""), 10);
    expect(remaining).toBeGreaterThan(0);
  });
});
