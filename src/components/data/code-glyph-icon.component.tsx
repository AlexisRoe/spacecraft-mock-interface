import type { JSX } from "react";
import type { CodeGlyphShape } from "../../utils/code-glyphs.util";

/** Props for {@link CodeGlyphIcon}. */
export interface CodeGlyphIconProps {
  /** Shapes making up the glyph, drawn in a 24x24 viewBox. */
  shapes: CodeGlyphShape[];
}

/** Renders a single code glyph as a stroked/filled 1-bit icon. */
export function CodeGlyphIcon({ shapes }: CodeGlyphIconProps): JSX.Element {
  return (
    <svg
      className="code-glyph-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.3}
      strokeLinecap="butt"
      aria-hidden="true"
    >
      {shapes.map((shape, index) => {
        const Tag = shape.tag;
        // biome-ignore lint/suspicious/noArrayIndexKey: shapes are a static, order-stable list per glyph
        return <Tag key={index} {...shape.attrs} />;
      })}
    </svg>
  );
}
