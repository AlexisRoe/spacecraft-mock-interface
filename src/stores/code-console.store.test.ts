import { act } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LINE_BREAK_TOKEN } from "../utils/code-glyphs.util";
import { useCodeConsoleStore } from "./code-console.store";

describe("useCodeConsoleStore", () => {
  afterEach(() => {
    act(() => {
      useCodeConsoleStore.setState({
        program: [],
        executedLength: null,
        selfDestructActive: false,
      });
    });
  });

  it("starts with an empty program", () => {
    expect(useCodeConsoleStore.getState().program).toEqual([]);
  });

  it("appends glyph codes in order", () => {
    act(() => {
      useCodeConsoleStore.getState().appendGlyph("000");
      useCodeConsoleStore.getState().appendGlyph("001");
    });
    expect(useCodeConsoleStore.getState().program).toEqual(["000", "001"]);
  });

  it("appends a line break token", () => {
    act(() => {
      useCodeConsoleStore.getState().appendGlyph("000");
      useCodeConsoleStore.getState().appendLineBreak();
    });
    expect(useCodeConsoleStore.getState().program).toEqual(["000", LINE_BREAK_TOKEN]);
  });

  it("deletes the last token", () => {
    act(() => {
      useCodeConsoleStore.getState().appendGlyph("000");
      useCodeConsoleStore.getState().appendGlyph("001");
      useCodeConsoleStore.getState().deleteLast();
    });
    expect(useCodeConsoleStore.getState().program).toEqual(["000"]);
  });

  it("clears the program", () => {
    act(() => {
      useCodeConsoleStore.getState().appendGlyph("000");
      useCodeConsoleStore.getState().clearProgram();
    });
    expect(useCodeConsoleStore.getState().program).toEqual([]);
  });

  it("records the program length on execute", () => {
    act(() => {
      useCodeConsoleStore.getState().appendGlyph("000");
      useCodeConsoleStore.getState().appendGlyph("001");
      useCodeConsoleStore.getState().executeProgram();
    });
    expect(useCodeConsoleStore.getState().executedLength).toBe(2);
  });

  it("does not activate self destruct just from entering the special glyph", () => {
    act(() => {
      useCodeConsoleStore.getState().appendGlyph("055");
    });
    expect(useCodeConsoleStore.getState().selfDestructActive).toBe(false);
  });

  it("activates self destruct when the special glyph is entered and executed", () => {
    act(() => {
      useCodeConsoleStore.getState().appendGlyph("000");
      useCodeConsoleStore.getState().appendGlyph("055");
      useCodeConsoleStore.getState().executeProgram();
    });
    expect(useCodeConsoleStore.getState().selfDestructActive).toBe(true);
  });

  it("does not activate self destruct executing a program without the special glyph", () => {
    act(() => {
      useCodeConsoleStore.getState().appendGlyph("000");
      useCodeConsoleStore.getState().executeProgram();
    });
    expect(useCodeConsoleStore.getState().selfDestructActive).toBe(false);
  });

  it("resets the program and clears self destruct on abort", () => {
    act(() => {
      useCodeConsoleStore.getState().appendGlyph("055");
      useCodeConsoleStore.getState().executeProgram();
      useCodeConsoleStore.getState().abortSelfDestruct();
    });
    expect(useCodeConsoleStore.getState().selfDestructActive).toBe(false);
    expect(useCodeConsoleStore.getState().program).toEqual([]);
  });
});
