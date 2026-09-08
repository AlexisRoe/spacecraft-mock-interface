import { afterEach, describe, expect, it } from "vitest";
import { INITIAL_LOG_ENTRIES } from "../utils/log-entries.util";
import { useLogConsoleStore } from "./log-console.store";

describe("useLogConsoleStore", () => {
  afterEach(() => {
    useLogConsoleStore.setState({
      entries: INITIAL_LOG_ENTRIES,
      selectedId: INITIAL_LOG_ENTRIES[0]?.id ?? null,
    });
  });

  it("starts with the initial entries and the first one selected", () => {
    const state = useLogConsoleStore.getState();
    expect(state.entries).toEqual(INITIAL_LOG_ENTRIES);
    expect(state.selectedId).toBe(INITIAL_LOG_ENTRIES[0].id);
  });

  it("selects a log by id", () => {
    useLogConsoleStore.getState().selectLog(INITIAL_LOG_ENTRIES[2].id);
    expect(useLogConsoleStore.getState().selectedId).toBe(INITIAL_LOG_ENTRIES[2].id);
  });

  it("records a new log, prepending it and selecting it", () => {
    const before = useLogConsoleStore.getState().entries.length;
    useLogConsoleStore.getState().recordNewLog();
    const state = useLogConsoleStore.getState();
    expect(state.entries.length).toBe(before + 1);
    expect(state.selectedId).toBe(state.entries[0].id);
  });
});
