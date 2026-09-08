import { describe, expect, it } from "vitest";
import {
  filterLogEntries,
  INITIAL_LOG_ENTRIES,
  PREPARED_LOG_ENTRIES,
  pickRandomPreparedLog,
} from "./log-entries.util";

describe("filterLogEntries", () => {
  it("returns all entries for the 'all' filter and an empty query", () => {
    expect(filterLogEntries(INITIAL_LOG_ENTRIES, "all", "")).toHaveLength(
      INITIAL_LOG_ENTRIES.length,
    );
  });

  it("filters by type", () => {
    const result = filterLogEntries(INITIAL_LOG_ENTRIES, "audio", "");
    expect(result.every((entry) => entry.type === "audio")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("matches a query case-insensitively against the title", () => {
    const result = filterLogEntries(INITIAL_LOG_ENTRIES, "all", "turbopump");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Torch S2 turbopump anomaly");
  });

  it("matches a query against the content", () => {
    const result = filterLogEntries(INITIAL_LOG_ENTRIES, "all", "traffic control");
    expect(result.some((entry) => entry.id === "aud-4471-902")).toBe(false);
    const contentMatch = filterLogEntries(INITIAL_LOG_ENTRIES, "all", "approach control");
    expect(contentMatch.some((entry) => entry.id === "aud-4471-902")).toBe(true);
  });

  it("combines type and query filters", () => {
    const result = filterLogEntries(INITIAL_LOG_ENTRIES, "text", "bridge");
    expect(result).toHaveLength(0);
  });
});

describe("pickRandomPreparedLog", () => {
  it("returns an entry based on one of the prepared entries with a unique id", () => {
    const picked = pickRandomPreparedLog();
    const base = PREPARED_LOG_ENTRIES.find((entry) => picked.id.startsWith(entry.id));
    expect(base).toBeDefined();
    expect(picked.title).toBe(base?.title);
    expect(picked.id).not.toBe(base?.id);
  });
});
