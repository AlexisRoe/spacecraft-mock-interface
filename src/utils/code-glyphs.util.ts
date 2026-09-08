/**
 * A single drawable shape (an SVG `path`, `circle`, or `rect`) making up
 * one code glyph.
 */
export interface CodeGlyphShape {
  /** SVG element tag to render. */
  tag: "path" | "circle" | "rect";
  /** SVG attributes for the shape (excluding `stroke`/`fill`, which are inherited from the icon). */
  attrs: Record<string, string>;
}

/** A single enterable code glyph: a 3-digit code and the shapes that draw it. */
export interface CodeGlyph {
  /** Stable 3-digit identifier for this glyph, used as its token in a stored program. */
  code: string;
  /** Human-readable identifier for the underlying pictogram, for reference only. */
  symbolId: string;
  /** Ordered list of SVG shapes making up the glyph, drawn in a 24x24 viewBox. */
  shapes: CodeGlyphShape[];
}

/** Token used in a stored program array to represent a line break. */
export const LINE_BREAK_TOKEN = "LF";

/**
 * The full set of enterable code glyphs, sorted by their underlying
 * pictogram identifier. Each glyph is addressed by its 3-digit `code` when
 * building or rendering a program.
 */
export const CODE_GLYPHS: CodeGlyph[] = [
  {
    code: "000",
    symbolId: "cAlign",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "path", attrs: { d: "M8 12 H16" } },
    ],
  },
  {
    code: "001",
    symbolId: "cClose",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "path", attrs: { d: "M14 8.5 L9.5 12 L14 15.5" } },
    ],
  },
  {
    code: "002",
    symbolId: "cHalt",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "rect", attrs: { x: "9", y: "9", width: "6", height: "6", fill: "currentColor" } },
    ],
  },
  {
    code: "003",
    symbolId: "cHold",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "path", attrs: { d: "M8 10 H16" } },
      { tag: "path", attrs: { d: "M8 14 H16" } },
    ],
  },
  {
    code: "004",
    symbolId: "cLoad",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "path", attrs: { d: "M12 16 V8" } },
      { tag: "path", attrs: { d: "M9 11 L12 8 L15 11" } },
    ],
  },
  {
    code: "005",
    symbolId: "cLock",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "3.6" } },
    ],
  },
  {
    code: "006",
    symbolId: "cOpen",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "path", attrs: { d: "M10 8.5 L14.5 12 L10 15.5" } },
    ],
  },
  {
    code: "007",
    symbolId: "cRun",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "path", attrs: { d: "M9.5 8 L16 12 L9.5 16 Z", fill: "currentColor" } },
    ],
  },
  {
    code: "008",
    symbolId: "cScan",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "circle", attrs: { cx: "8", cy: "12", r: "1.5", fill: "currentColor" } },
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "1.5", fill: "currentColor" } },
      { tag: "circle", attrs: { cx: "16", cy: "12", r: "1.5", fill: "currentColor" } },
    ],
  },
  {
    code: "009",
    symbolId: "cSet",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "path", attrs: { d: "M8 12 H16" } },
      { tag: "path", attrs: { d: "M12 8 V16" } },
    ],
  },
  {
    code: "010",
    symbolId: "cUnlock",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "path", attrs: { d: "M8.4 13.6 A 3.6 3.6 0 1 1 15.6 13.6" } },
    ],
  },
  {
    code: "011",
    symbolId: "cVent",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "path", attrs: { d: "M12 8 V16" } },
      { tag: "path", attrs: { d: "M9 13 L12 16 L15 13" } },
    ],
  },
  {
    code: "012",
    symbolId: "fAnd",
    shapes: [
      { tag: "path", attrs: { d: "M7 4.5 V19.5" } },
      { tag: "path", attrs: { d: "M17 4.5 V19.5" } },
      { tag: "path", attrs: { d: "M7 12 H17" } },
    ],
  },
  {
    code: "013",
    symbolId: "fBegin",
    shapes: [{ tag: "path", attrs: { d: "M14 4 H5 V20 H14" } }],
  },
  {
    code: "014",
    symbolId: "fElse",
    shapes: [
      { tag: "path", attrs: { d: "M12 3 L21 12 L12 21 L3 12 Z" } },
      { tag: "path", attrs: { d: "M8 16 L16 8" } },
    ],
  },
  {
    code: "015",
    symbolId: "fEnd",
    shapes: [{ tag: "path", attrs: { d: "M10 4 H19 V20 H10" } }],
  },
  {
    code: "016",
    symbolId: "fIf",
    shapes: [{ tag: "path", attrs: { d: "M12 3 L21 12 L12 21 L3 12 Z" } }],
  },
  {
    code: "017",
    symbolId: "fLoop",
    shapes: [
      { tag: "path", attrs: { d: "M10 4 H4 V20 H10" } },
      { tag: "path", attrs: { d: "M14 4 H20 V20 H14" } },
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "2", fill: "currentColor" } },
    ],
  },
  {
    code: "018",
    symbolId: "fNot",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "6.5" } },
      { tag: "path", attrs: { d: "M6 18 L18 6" } },
    ],
  },
  {
    code: "019",
    symbolId: "fNow",
    shapes: [
      { tag: "path", attrs: { d: "M4.5 12 H19.5" } },
      { tag: "circle", attrs: { cx: "12", cy: "6.5", r: "2", fill: "currentColor" } },
      { tag: "circle", attrs: { cx: "12", cy: "17.5", r: "2", fill: "currentColor" } },
    ],
  },
  {
    code: "020",
    symbolId: "fOr",
    shapes: [
      { tag: "path", attrs: { d: "M7 4.5 V19.5" } },
      { tag: "path", attrs: { d: "M17 4.5 V19.5" } },
    ],
  },
  {
    code: "021",
    symbolId: "fSeq",
    shapes: [
      { tag: "circle", attrs: { cx: "5", cy: "12", r: "2", fill: "currentColor" } },
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "2", fill: "currentColor" } },
      { tag: "circle", attrs: { cx: "19", cy: "12", r: "2", fill: "currentColor" } },
    ],
  },
  {
    code: "022",
    symbolId: "fThen",
    shapes: [
      { tag: "path", attrs: { d: "M5.5 6 L11 12 L5.5 18" } },
      { tag: "path", attrs: { d: "M12.5 6 L18 12 L12.5 18" } },
    ],
  },
  {
    code: "023",
    symbolId: "fWait",
    shapes: [
      { tag: "path", attrs: { d: "M4.5 5.5 H19.5" } },
      { tag: "path", attrs: { d: "M4.5 18.5 H19.5" } },
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "2", fill: "currentColor" } },
    ],
  },
  {
    code: "024",
    symbolId: "g0",
    shapes: [
      { tag: "path", attrs: { d: "M3 8 H21" } },
      { tag: "circle", attrs: { cx: "12", cy: "16.4", r: "3.6" } },
    ],
  },
  {
    code: "025",
    symbolId: "g1",
    shapes: [
      { tag: "path", attrs: { d: "M3 8 H21" } },
      { tag: "path", attrs: { d: "M12 12 V21" } },
    ],
  },
  {
    code: "026",
    symbolId: "g2",
    shapes: [
      { tag: "path", attrs: { d: "M3 8 H21" } },
      { tag: "path", attrs: { d: "M9.7 12 V21" } },
      { tag: "path", attrs: { d: "M14.3 12 V21" } },
    ],
  },
  {
    code: "027",
    symbolId: "g3",
    shapes: [
      { tag: "path", attrs: { d: "M3 8 H21" } },
      { tag: "path", attrs: { d: "M7.4 12 V21" } },
      { tag: "path", attrs: { d: "M12 12 V21" } },
      { tag: "path", attrs: { d: "M16.6 12 V21" } },
    ],
  },
  {
    code: "028",
    symbolId: "g4",
    shapes: [
      { tag: "path", attrs: { d: "M3 8 H21" } },
      { tag: "path", attrs: { d: "M5.1 12 V21" } },
      { tag: "path", attrs: { d: "M9.7 12 V21" } },
      { tag: "path", attrs: { d: "M14.3 12 V21" } },
      { tag: "path", attrs: { d: "M18.9 12 V21" } },
    ],
  },
  {
    code: "029",
    symbolId: "g5",
    shapes: [
      { tag: "path", attrs: { d: "M3 8 H21" } },
      { tag: "circle", attrs: { cx: "12", cy: "4.2", r: "2.2", fill: "currentColor" } },
    ],
  },
  {
    code: "030",
    symbolId: "g6",
    shapes: [
      { tag: "path", attrs: { d: "M3 8 H21" } },
      { tag: "circle", attrs: { cx: "12", cy: "4.2", r: "2.2", fill: "currentColor" } },
      { tag: "path", attrs: { d: "M12 12 V21" } },
    ],
  },
  {
    code: "031",
    symbolId: "g7",
    shapes: [
      { tag: "path", attrs: { d: "M3 8 H21" } },
      { tag: "circle", attrs: { cx: "12", cy: "4.2", r: "2.2", fill: "currentColor" } },
      { tag: "path", attrs: { d: "M9.7 12 V21" } },
      { tag: "path", attrs: { d: "M14.3 12 V21" } },
    ],
  },
  {
    code: "032",
    symbolId: "g8",
    shapes: [
      { tag: "path", attrs: { d: "M3 8 H21" } },
      { tag: "circle", attrs: { cx: "12", cy: "4.2", r: "2.2", fill: "currentColor" } },
      { tag: "path", attrs: { d: "M7.4 12 V21" } },
      { tag: "path", attrs: { d: "M12 12 V21" } },
      { tag: "path", attrs: { d: "M16.6 12 V21" } },
    ],
  },
  {
    code: "033",
    symbolId: "g9",
    shapes: [
      { tag: "path", attrs: { d: "M3 8 H21" } },
      { tag: "circle", attrs: { cx: "12", cy: "4.2", r: "2.2", fill: "currentColor" } },
      { tag: "path", attrs: { d: "M5.1 12 V21" } },
      { tag: "path", attrs: { d: "M9.7 12 V21" } },
      { tag: "path", attrs: { d: "M14.3 12 V21" } },
      { tag: "path", attrs: { d: "M18.9 12 V21" } },
    ],
  },
  {
    code: "034",
    symbolId: "gBio",
    shapes: [
      { tag: "path", attrs: { d: "M3.5 20.5 H20.5" } },
      { tag: "path", attrs: { d: "M4.6 16.5 A 7.4 7.4 0 0 1 19.4 16.5" } },
      { tag: "path", attrs: { d: "M8.2 16.5 A 3.8 3.8 0 0 1 15.8 16.5" } },
      { tag: "circle", attrs: { cx: "12", cy: "16.5", r: "1.6", fill: "currentColor" } },
    ],
  },
  {
    code: "035",
    symbolId: "gReactor",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8" } },
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "2.6", fill: "currentColor" } },
      { tag: "path", attrs: { d: "M15.4 15.4 L17.2 17.2" } },
      { tag: "path", attrs: { d: "M8.6 8.6 L6.8 6.8" } },
      { tag: "path", attrs: { d: "M15.4 8.6 L17.2 6.8" } },
      { tag: "path", attrs: { d: "M8.6 15.4 L6.8 17.2" } },
    ],
  },
  {
    code: "036",
    symbolId: "sCargo",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "rect", attrs: { x: "8.5", y: "8.5", width: "7", height: "7" } },
    ],
  },
  {
    code: "037",
    symbolId: "sComms",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "path", attrs: { d: "M7.5 14.5 A 4.5 4.5 0 0 1 16.5 14.5" } },
      { tag: "circle", attrs: { cx: "12", cy: "14.5", r: "1.5", fill: "currentColor" } },
    ],
  },
  {
    code: "038",
    symbolId: "sCoolant",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "circle", attrs: { cx: "8", cy: "12", r: "1.5", fill: "currentColor" } },
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "1.5", fill: "currentColor" } },
      { tag: "circle", attrs: { cx: "16", cy: "12", r: "1.5", fill: "currentColor" } },
    ],
  },
  {
    code: "039",
    symbolId: "sGravity",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "path", attrs: { d: "M12 7.5 V15.5" } },
      { tag: "path", attrs: { d: "M9 12.5 L12 15.5 L15 12.5" } },
    ],
  },
  {
    code: "040",
    symbolId: "sHull",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "path", attrs: { d: "M8.5 8.5 L15.5 15.5" } },
      { tag: "path", attrs: { d: "M15.5 8.5 L8.5 15.5" } },
    ],
  },
  {
    code: "041",
    symbolId: "sLife",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "path", attrs: { d: "M8 12 H16" } },
      { tag: "path", attrs: { d: "M12 8 V16" } },
    ],
  },
  {
    code: "042",
    symbolId: "sNav",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "path", attrs: { d: "M12 8 L16 12 L12 16 L8 12 Z" } },
    ],
  },
  {
    code: "043",
    symbolId: "sPower",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "path", attrs: { d: "M12 7.5 V16.5" } },
    ],
  },
  {
    code: "044",
    symbolId: "sSensors",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "circle", attrs: { cx: "12", cy: "8.5", r: "1.7", fill: "currentColor" } },
      { tag: "circle", attrs: { cx: "12", cy: "15.5", r: "1.7", fill: "currentColor" } },
    ],
  },
  {
    code: "045",
    symbolId: "sShield",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "3.5" } },
    ],
  },
  {
    code: "046",
    symbolId: "stAlert",
    shapes: [
      { tag: "path", attrs: { d: "M12 3 L21 12 L12 21 L3 12 Z" } },
      { tag: "path", attrs: { d: "M12 7.5 V13" } },
      { tag: "circle", attrs: { cx: "12", cy: "16.8", r: "1.6", fill: "currentColor" } },
    ],
  },
  {
    code: "047",
    symbolId: "stAll",
    shapes: [
      { tag: "rect", attrs: { x: "3.5", y: "3.5", width: "17", height: "17" } },
      { tag: "rect", attrs: { x: "8", y: "8", width: "8", height: "8" } },
    ],
  },
  {
    code: "048",
    symbolId: "stCrew",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "8", r: "3.5" } },
      { tag: "path", attrs: { d: "M5.5 20 A 6.5 6.5 0 0 1 18.5 20" } },
    ],
  },
  {
    code: "049",
    symbolId: "stCrit",
    shapes: [
      { tag: "path", attrs: { d: "M12 3 L21 12 L12 21 L3 12 Z" } },
      { tag: "path", attrs: { d: "M8.5 8.5 L15.5 15.5" } },
      { tag: "path", attrs: { d: "M15.5 8.5 L8.5 15.5" } },
    ],
  },
  {
    code: "050",
    symbolId: "stEmpty",
    shapes: [
      { tag: "path", attrs: { d: "M12 3 L21 12 L12 21 L3 12 Z" } },
      { tag: "rect", attrs: { x: "9", y: "9", width: "6", height: "6" } },
    ],
  },
  {
    code: "051",
    symbolId: "stFull",
    shapes: [
      { tag: "path", attrs: { d: "M12 3 L21 12 L12 21 L3 12 Z" } },
      { tag: "rect", attrs: { x: "9", y: "9", width: "6", height: "6", fill: "currentColor" } },
    ],
  },
  {
    code: "052",
    symbolId: "sThrust",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "path", attrs: { d: "M12 7.5 L16 16 L8 16 Z", fill: "currentColor" } },
    ],
  },
  {
    code: "053",
    symbolId: "stLinked",
    shapes: [
      { tag: "path", attrs: { d: "M12 3 L21 12 L12 21 L3 12 Z" } },
      { tag: "circle", attrs: { cx: "9", cy: "12", r: "1.7", fill: "currentColor" } },
      { tag: "circle", attrs: { cx: "15", cy: "12", r: "1.7", fill: "currentColor" } },
    ],
  },
  {
    code: "054",
    symbolId: "stNone",
    shapes: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "8.5" } },
      { tag: "path", attrs: { d: "M6 18 L18 6" } },
    ],
  },
  {
    code: "055",
    symbolId: "stSafe",
    shapes: [
      { tag: "path", attrs: { d: "M12 3 L21 12 L12 21 L3 12 Z" } },
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "2.2", fill: "currentColor" } },
    ],
  },
  {
    code: "056",
    symbolId: "stSealed",
    shapes: [
      { tag: "path", attrs: { d: "M12 3 L21 12 L12 21 L3 12 Z" } },
      { tag: "path", attrs: { d: "M8 10 H16" } },
      { tag: "path", attrs: { d: "M8 14 H16" } },
    ],
  },
  {
    code: "057",
    symbolId: "stTimed",
    shapes: [
      { tag: "path", attrs: { d: "M12 3 L21 12 L12 21 L3 12 Z" } },
      { tag: "path", attrs: { d: "M12 7.5 V16.5" } },
    ],
  },
  {
    code: "058",
    symbolId: "stVoid",
    shapes: [
      { tag: "path", attrs: { d: "M12 3 L21 12 L12 21 L3 12 Z" } },
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "3.5" } },
    ],
  },
];

/** Looks up a {@link CodeGlyph} by its 3-digit code. */
export function findCodeGlyph(code: string): CodeGlyph | undefined {
  return CODE_GLYPHS.find((glyph) => glyph.code === code);
}
