import type { JSX } from "react";
import { useCodeConsoleStore } from "../../stores/code-console.store";
import { findCodeGlyph, LINE_BREAK_TOKEN } from "../../utils/code-glyphs.util";
import { CodeGlyphIcon } from "./code-glyph-icon.component";

import "./code-editor-view.component.css";

/** Splits a flat token program into lines, breaking on {@link LINE_BREAK_TOKEN}. */
function toLines(program: string[]): string[][] {
  const lines: string[][] = [[]];
  for (const token of program) {
    if (token === LINE_BREAK_TOKEN) {
      lines.push([]);
    } else {
      lines[lines.length - 1].push(token);
    }
  }
  return lines;
}

/**
 * Left-hand panel of the Data view's code state: the entered program,
 * rendered as numbered lines of glyphs.
 */
export function CodeEditorView(): JSX.Element {
  const program = useCodeConsoleStore((state) => state.program);
  const lines = toLines(program);

  return (
    <div className="code-editor-view inset-padding">
      {lines.map((line, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: lines are re-derived from the program on every render
        <div className="code-editor-view__line" key={index}>
          <span className="code-editor-view__line-number">
            {String(index + 1).padStart(3, "0")}
          </span>
          <div className="code-editor-view__line-tokens">
            {line.map((code, tokenIndex) => {
              const glyph = findCodeGlyph(code);
              if (!glyph) {
                return null;
              }
              return (
                <CodeGlyphIcon
                  // biome-ignore lint/suspicious/noArrayIndexKey: tokens are re-derived from the program on every render
                  key={tokenIndex}
                  shapes={glyph.shapes}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
