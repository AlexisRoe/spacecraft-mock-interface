import { create } from "zustand";
import { LINE_BREAK_TOKEN } from "../utils/code-glyphs.util";

/** Glyph code that, once entered and then executed, triggers the self-destruct easter egg. */
const SELF_DESTRUCT_GLYPH_CODE = "055";

/** Checks whether `program` contains the self-destruct glyph anywhere. */
function containsSelfDestructGlyph(program: string[]): boolean {
  return program.includes(SELF_DESTRUCT_GLYPH_CODE);
}

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
  /** Whether the self-destruct easter egg is currently active. */
  selfDestructActive: boolean;
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
  /** Cancels the self-destruct easter egg and resets the program. */
  abortSelfDestruct: () => void;
}

/**
 * Global store holding the program entered on the Data view's code console.
 */
export const useCodeConsoleStore = create<CodeConsoleState>((set) => ({
  program: [],
  executedLength: null,
  selfDestructActive: false,
  appendGlyph: (code) => set((state) => ({ program: [...state.program, code] })),
  appendLineBreak: () => set((state) => ({ program: [...state.program, LINE_BREAK_TOKEN] })),
  deleteLast: () => set((state) => ({ program: state.program.slice(0, -1) })),
  clearProgram: () => set({ program: [] }),
  executeProgram: () =>
    set((state) => ({
      executedLength: state.program.length,
      selfDestructActive: state.selfDestructActive || containsSelfDestructGlyph(state.program),
    })),
  abortSelfDestruct: () => set({ selfDestructActive: false, program: [] }),
}));
