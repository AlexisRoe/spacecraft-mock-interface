import { create } from "zustand";
import {
  INITIAL_LOG_ENTRIES,
  type LogEntry,
  pickRandomPreparedLog,
} from "../utils/log-entries.util";

/** Shape of the log console state and the actions available to mutate it. */
export interface LogConsoleState {
  /** Log entries currently in the browser, newest recordings first. */
  entries: LogEntry[];
  /** Id of the currently selected/viewed entry, or `null` if none. */
  selectedId: string | null;
  /** Selects an entry for viewing in the detail panel. */
  selectLog: (id: string) => void;
  /** Records a new log by drawing a random prepared entry and adding it to the top of the list. */
  recordNewLog: () => void;
}

/** Global store holding the Data view's log browser state. */
export const useLogConsoleStore = create<LogConsoleState>((set) => ({
  entries: INITIAL_LOG_ENTRIES,
  selectedId: INITIAL_LOG_ENTRIES[0]?.id ?? null,
  selectLog: (id) => set({ selectedId: id }),
  recordNewLog: () =>
    set((state) => {
      const newEntry = pickRandomPreparedLog();
      return { entries: [newEntry, ...state.entries], selectedId: newEntry.id };
    }),
}));
