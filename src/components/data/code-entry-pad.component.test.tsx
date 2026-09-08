import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useCodeConsoleStore } from "../../stores/code-console.store";
import { CODE_GLYPHS } from "../../utils/code-glyphs.util";
import { CodeEntryPad } from "./code-entry-pad.component";

describe("CodeEntryPad", () => {
  afterEach(() => {
    act(() => {
      useCodeConsoleStore.setState({ program: [], executedLength: null });
    });
  });

  it("renders one unlabelled button per glyph", () => {
    render(<CodeEntryPad />);
    const grid = document.querySelector(".code-entry-pad__grid");
    expect(grid?.querySelectorAll("button")).toHaveLength(CODE_GLYPHS.length);
  });

  it("appends the glyph's code when a glyph button is pressed", () => {
    render(<CodeEntryPad />);
    const grid = document.querySelector(".code-entry-pad__grid") as HTMLElement;
    const firstButton = grid.querySelectorAll("button")[0];
    fireEvent.click(firstButton);
    expect(useCodeConsoleStore.getState().program).toEqual([CODE_GLYPHS[0].code]);
  });

  it("appends a line break", () => {
    render(<CodeEntryPad />);
    fireEvent.click(screen.getByText("Line Break"));
    expect(useCodeConsoleStore.getState().program).toEqual(["LF"]);
  });

  it("deletes the last token", () => {
    act(() => {
      useCodeConsoleStore.setState({ program: [CODE_GLYPHS[0].code] });
    });
    render(<CodeEntryPad />);
    fireEvent.click(screen.getByText("Delete"));
    expect(useCodeConsoleStore.getState().program).toEqual([]);
  });

  it("executes the program", () => {
    act(() => {
      useCodeConsoleStore.setState({ program: [CODE_GLYPHS[0].code] });
    });
    render(<CodeEntryPad />);
    fireEvent.click(screen.getByText("Execute"));
    expect(useCodeConsoleStore.getState().executedLength).toBe(1);
  });
});
