import type { JSX } from "react";
import { useLogConsoleStore } from "../../stores/log-console.store";
import { StatDisplay } from "../common/stat-display.component";

import "./log-detail.component.css";

/**
 * Right-hand panel of the Data view's log state: the selected log's title,
 * type-specific content, and stored/author/access metadata with (no-op)
 * update/delete controls. Shows a placeholder when no log is selected.
 */
export function LogDetail(): JSX.Element {
  const entries = useLogConsoleStore((state) => state.entries);
  const selectedId = useLogConsoleStore((state) => state.selectedId);
  const entry = entries.find((candidate) => candidate.id === selectedId);

  if (!entry) {
    return (
      <div className="log-detail inset-padding">
        <p className="log-detail__empty">No log selected.</p>
      </div>
    );
  }

  return (
    <div className="log-detail">
      <div className="log-detail__header">
        <h2 className="log-detail__title">{entry.title}</h2>
        <p className="log-detail__meta">
          {entry.code} · {entry.meta}
        </p>
      </div>
      <div className="log-detail__content">
        {entry.type === "video" && (
          <div className="log-detail__media log-detail__media--video">
            <span className="log-detail__play">&#9658;</span>
            <span className="log-detail__media-caption">Frame 00:00:00</span>
          </div>
        )}
        {entry.type === "audio" && (
          <div className="log-detail__media log-detail__media--audio">
            <div className="log-detail__waveform">
              {Array.from({ length: 32 }, (_, index) => index).map((index) => (
                <span
                  key={index}
                  className="log-detail__waveform-bar"
                  style={{ height: `${20 + ((index * 37) % 80)}%` }}
                />
              ))}
            </div>
            <span className="log-detail__media-corner log-detail__media-corner--left">
              Waveform · 44.1 kHz Mono
            </span>
            <span className="log-detail__media-corner log-detail__media-corner--right">
              Transcript Available
            </span>
          </div>
        )}
        {entry.type === "text" && (
          <div className="log-detail__text">
            {entry.content.split("\n\n").map((paragraph) => (
              <p className="log-detail__paragraph" key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
          </div>
        )}
        {entry.type !== "text" && <p className="log-detail__description">{entry.content}</p>}
      </div>
      <div className="log-detail__footer">
        <StatDisplay label="Stored" value={entry.stored} />
        <StatDisplay label="Author" value={entry.author} />
        <StatDisplay label="Access" value={entry.access} />
      </div>
      <div className="log-detail__actions">
        <button type="button" className="log-detail__action" onClick={() => {}}>
          <span className="log-detail__action-caption">Record</span>
          <span className="log-detail__action-label">Update</span>
        </button>
        <button type="button" className="log-detail__action" onClick={() => {}}>
          <span className="log-detail__action-caption">Record</span>
          <span className="log-detail__action-label">Delete</span>
        </button>
      </div>
    </div>
  );
}
