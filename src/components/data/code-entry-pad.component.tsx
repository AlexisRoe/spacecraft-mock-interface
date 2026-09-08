import type { JSX } from "react";
import { useCodeConsoleStore } from "../../stores/code-console.store";
import { CODE_GLYPHS } from "../../utils/code-glyphs.util";
import { CodeGlyphIcon } from "./code-glyph-icon.component";

import "./code-entry-pad.component.css";

/**
 * Right-hand panel of the Data view's code state: an unlabelled grid of
 * glyph buttons that append to the program, a line-break/delete row, and an
 * execute button.
 */
export function CodeEntryPad(): JSX.Element {
  const appendGlyph = useCodeConsoleStore((state) => state.appendGlyph);
  const appendLineBreak = useCodeConsoleStore((state) => state.appendLineBreak);
  const deleteLast = useCodeConsoleStore((state) => state.deleteLast);
  const executeProgram = useCodeConsoleStore((state) => state.executeProgram);

  return (
    <div className="code-entry-pad">
      <div className="code-entry-pad__grid">
        {CODE_GLYPHS.map((glyph) => (
          <button
            key={glyph.code}
            type="button"
            className="code-entry-pad__glyph"
            onClick={() => appendGlyph(glyph.code)}
          >
            <CodeGlyphIcon shapes={glyph.shapes} />
          </button>
        ))}
      </div>
      <div className="code-entry-pad__edit-row">
        <button type="button" className="code-entry-pad__edit-button" onClick={appendLineBreak}>
          <span className="code-entry-pad__button-caption">Helm 01 · Insert Break</span>
          <span className="code-entry-pad__button-label">Line Break</span>
        </button>
        <button type="button" className="code-entry-pad__edit-button" onClick={deleteLast}>
          <span className="code-entry-pad__button-caption">Purge Last Token</span>
          <span className="code-entry-pad__button-label">Delete</span>
        </button>
      </div>
      <button type="button" className="code-entry-pad__execute" onClick={executeProgram}>
        <span className="code-entry-pad__button-caption">Uplink To Core Systems</span>
        <span className="code-entry-pad__button-label">Execute</span>
      </button>
    </div>
  );
}
