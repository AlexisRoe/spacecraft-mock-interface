import { type JSX, useState } from "react";
import { useClock } from "../../hooks/use-clock.hook";
import { useLogConsoleStore } from "../../stores/log-console.store";
import { filterLogEntries, type LogEntryType } from "../../utils/log-entries.util";

import "./log-list.component.css";

/** Filter tab options shown above the log list. */
const FILTER_TABS: Array<{ value: LogEntryType | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "text", label: "Text" },
];

/** Quick-search keyword shortcuts shown beneath the search input. */
const QUICK_FILTERS = ["BRIDGE", "COMMS", "ENGINEERING", "SCIENCE"];

/**
 * Left-hand panel of the Data view's log state: a search box, type filter
 * tabs, the (filtered) list of recorded logs, and a control to record a new
 * one.
 */
export function LogList(): JSX.Element {
  const entries = useLogConsoleStore((state) => state.entries);
  const selectedId = useLogConsoleStore((state) => state.selectedId);
  const selectLog = useLogConsoleStore((state) => state.selectLog);
  const recordNewLog = useLogConsoleStore((state) => state.recordNewLog);
  const [filter, setFilter] = useState<LogEntryType | "all">("all");
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const { dayOfYear: missionDay } = useClock();

  const visibleEntries = filterLogEntries(entries, filter, query);

  function handleRecordClick(): void {
    if (isRecording) {
      recordNewLog();
    }
    setIsRecording((current) => !current);
  }

  function handleQuickFilterClick(value: string): void {
    setQuery((current) => (current === value ? "" : value));
  }

  return (
    <div className="log-list">
      <div className="log-list__search">
        <input
          type="search"
          className="log-list__search-input"
          placeholder="Search subject or content"
          aria-label="Search logs"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="log-list__search-label">Query</span>
      </div>
      <div className="log-list__quick-filters">
        {QUICK_FILTERS.map((value) => (
          <button
            key={value}
            type="button"
            className={[
              "log-list__quick-filter",
              query === value && "log-list__quick-filter--active",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={query === value}
            onClick={() => handleQuickFilterClick(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="log-list__quick-filters log-list__quick-filters--day">
        <span className="log-list__quick-filter log-list__quick-filter--day">Day {missionDay}</span>
      </div>
      <div className="log-list__tabs">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={["log-list__tab", filter === tab.value && "log-list__tab--active"]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={filter === tab.value}
            onClick={() => setFilter(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="log-list__entries">
        {visibleEntries.length === 0 ? (
          <p className="log-list__empty">No logs match this search.</p>
        ) : (
          visibleEntries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={["log-list__entry", entry.id === selectedId && "log-list__entry--selected"]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={entry.id === selectedId}
              onClick={() => selectLog(entry.id)}
            >
              <span className="log-list__entry-type">{entry.type}</span>
              <span className="log-list__entry-main">
                <span className="log-list__entry-title">{entry.title}</span>
                <span className="log-list__entry-meta">
                  {entry.code} · {entry.meta}
                </span>
              </span>
              <span className="log-list__entry-category">{entry.category}</span>
            </button>
          ))
        )}
      </div>
      <button
        type="button"
        className={["log-list__record", isRecording && "log-list__record--recording"]
          .filter(Boolean)
          .join(" ")}
        aria-pressed={isRecording}
        onClick={handleRecordClick}
      >
        <span className="log-list__record-caption">
          {isRecording ? "Audio Channel Open · HELM 01" : "Helm 01 · Open Channel"}
        </span>
        <span className="log-list__record-label">
          {isRecording ? "Recording In Progress · Click To Stop" : "Record New Log"}
        </span>
      </button>
    </div>
  );
}
