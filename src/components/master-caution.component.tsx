import type { JSX } from "react";

import "./master-caution.component.css";

/** Props for {@link MasterCaution}. */
export interface MasterCautionProps {
  /** Advisory summary text, e.g. "No advisories." */
  summary: string;
  /** Timestamp of the last advisory acknowledgement. */
  lastAcknowledgement: string;
}

/** Master caution panel pinned to the bottom of the nav bar. */
export function MasterCaution({ summary, lastAcknowledgement }: MasterCautionProps): JSX.Element {
  return (
    <div className="master-caution">
      <span className="master-caution__label">Master Caution</span>
      <span className="master-caution__status">Clear</span>
      <span className="master-caution__summary">
        {summary} Last acknowledgement {lastAcknowledgement}.
      </span>
    </div>
  );
}
