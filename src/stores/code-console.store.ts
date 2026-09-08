import { create } from "zustand";
import { LINE_BREAK_TOKEN } from "../utils/code-glyphs.util";

/**
 * Shape of the code console state and the actions available to mutate it.
 * The program is stored as a flat array of tokens: each token is either a
 * glyph's 3-digit code or {@link LINE_BREAK_TOKEN}.
 */
export interface CodeConsoleState {
  /** Ordered tokens making up the entered program. */
  program: string[];
  /** Number of tokens in the program at the last execute, or `null` if never executed. */
  executedLength: number | null;
  /** Appends a glyph code to the end of the program. */
  appendGlyph: (code: string) => void;
  /** Appends a line break to the end of the program. */
  appendLineBreak: () => void;
  /** Removes the last token (glyph or line break) from the program. */
  deleteLast: () => void;
  /** Clears the entire program. */
  clearProgram: () => void;
  /** Marks the current program as executed. */
  executeProgram: () => void;
}

/**
 * Global store holding the program entered on the Data view's code console.
 */
export const useCodeConsoleStore = create<CodeConsoleState>((set) => ({
  program: [],
  executedLength: null,
  appendGlyph: (code) => set((state) => ({ program: [...state.program, code] })),
  appendLineBreak: () => set((state) => ({ program: [...state.program, LINE_BREAK_TOKEN] })),
  deleteLast: () => set((state) => ({ program: state.program.slice(0, -1) })),
  clearProgram: () => set({ program: [] }),
  executeProgram: () => set((state) => ({ executedLength: state.program.length })),
}));
