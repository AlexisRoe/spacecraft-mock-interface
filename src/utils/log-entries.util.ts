/** Kind of recording a {@link LogEntry} represents. */
export type LogEntryType = "video" | "audio" | "text";

/** A single ship's log record shown in the Data console's log browser. */
export interface LogEntry {
  /** Stable unique identifier for this entry. */
  id: string;
  /** Kind of recording. */
  type: LogEntryType;
  /** Short human-readable title. */
  title: string;
  /** Log code shown next to the title, e.g. "VID-4471-118". */
  code: string;
  /** Short metadata line, e.g. "00:14:22 · 2 CAMERAS" or "1 240 WORDS · ENG · REV 2". */
  meta: string;
  /** Uppercase category tag, e.g. "BRIDGE" or "ENGINEERING". */
  category: string;
  /** Body text: transcript/description for audio and video, full text for text logs. */
  content: string;
  /** Ship day the entry was stored on, e.g. "DAY 417". */
  stored: string;
  /** Author/station that recorded the entry, e.g. "HELM 01". */
  author: string;
  /** Access level required to view the entry, e.g. "CREW". */
  access: string;
}

/** The log entries already present in the log browser when the view first loads. */
export const INITIAL_LOG_ENTRIES: LogEntry[] = [
  {
    id: "vid-4471-118",
    type: "video",
    title: "Bridge watch handover",
    code: "VID-4471-118",
    meta: "00:14:22 · 2 CAMERAS",
    category: "BRIDGE",
    content: "Handover recording between watch officers at shift change.",
    stored: "DAY 417",
    author: "WATCH 01",
    access: "CREW",
  },
  {
    id: "aud-4471-902",
    type: "audio",
    title: "Ceres Traffic clearance",
    code: "AUD-4471-902",
    meta: "00:03:41 · CH 02",
    category: "COMMS",
    content: "Ceres approach control clears the ship for final descent corridor.",
    stored: "DAY 417",
    author: "COMMS 02",
    access: "CREW",
  },
  {
    id: "log-4471-3310",
    type: "text",
    title: "Torch S2 turbopump anomaly",
    code: "LOG-4471-3310",
    meta: "1 240 WORDS · ENG · REV 2",
    category: "ENGINEERING",
    content:
      "Survey of the Keid Branch corridor concluded at 13:20 ship time.\n\n" +
      "Field gradiometry shows a persistent 0.42 uT/km gradient along the approach vector, " +
      "consistent with a stellar wind shock rather than a local mass anomaly.\n\n" +
      "Gravimetric array logged an 18 mGal tidal shift at 03:40, bearing 214 degrees. " +
      "Confidence 0.91. Recommend a second pass with the MK IV field mapper before " +
      "committing to the third jump.\n\n" +
      "Particle counter recorded a 9.4e4 p/cm3 burst during the shift. Crew dose remained " +
      "within limits at 0.14 mSv for the day.",
    stored: "DAY 417",
    author: "HELM 01",
    access: "CREW",
  },
  {
    id: "vid-4471-119",
    type: "video",
    title: "Probe MK I release",
    code: "VID-4471-119",
    meta: "00:02:08 · AFT BAY",
    category: "SCIENCE",
    content: "Release sequence for the MK I survey probe from the aft bay.",
    stored: "DAY 417",
    author: "SCIENCE 01",
    access: "CREW",
  },
  {
    id: "aud-4471-903",
    type: "audio",
    title: "Crew medical brief, day 417",
    code: "AUD-4471-903",
    meta: "00:11:57 · PRIVATE",
    category: "MEDICAL",
    content: "Routine crew medical status brief for ship day 417.",
    stored: "DAY 417",
    author: "MEDICAL 01",
    access: "PRIVATE",
  },
];

/** Pool of pre-recorded log entries a "record new log" action can draw from. */
export const PREPARED_LOG_ENTRIES: LogEntry[] = [
  {
    id: "vid-4471-120",
    type: "video",
    title: "Hull section 6 inspection",
    code: "VID-4471-120",
    meta: "00:07:33 · EVA CAM",
    category: "HULL",
    content: "EVA helmet-cam footage of the section 6 hull inspection.",
    stored: "DAY 418",
    author: "HULL 01",
    access: "CREW",
  },
  {
    id: "log-4471-3311",
    type: "text",
    title: "Field emitter 4 derate report",
    code: "LOG-4471-3311",
    meta: "640 WORDS · FIELD",
    category: "DEFENCE",
    content:
      "Field emitter 4 output derated to 78% following a coolant loop pressure drop.\n\n" +
      "Recommend swapping the secondary coolant pump before the next high-load maneuver.",
    stored: "DAY 418",
    author: "DEFENCE 02",
    access: "CREW",
  },
  {
    id: "log-4471-3312",
    type: "text",
    title: "Keid Branch survey summary",
    code: "LOG-4471-3312",
    meta: "3 100 WORDS · SCI",
    category: "SCIENCE",
    content:
      "Consolidated survey summary for the Keid Branch corridor, covering gravimetric, " +
      "particle, and field readings collected over the last three ship days.",
    stored: "DAY 418",
    author: "SCIENCE 02",
    access: "CREW",
  },
  {
    id: "aud-4471-904",
    type: "audio",
    title: "Engineering shift log",
    code: "AUD-4471-904",
    meta: "00:05:12 · CH 04",
    category: "ENGINEERING",
    content: "Verbal shift log covering reactor output and coolant status.",
    stored: "DAY 418",
    author: "ENGINEERING 01",
    access: "CREW",
  },
  {
    id: "vid-4471-121",
    type: "video",
    title: "Cargo bay loading",
    code: "VID-4471-121",
    meta: "00:09:47 · BAY CAM",
    category: "LOGISTICS",
    content: "Automated loader footage of cargo bay restocking.",
    stored: "DAY 418",
    author: "LOGISTICS 01",
    access: "CREW",
  },
  {
    id: "aud-4471-905",
    type: "audio",
    title: "Distress signal intercept",
    code: "AUD-4471-905",
    meta: "00:01:58 · CH 09",
    category: "COMMS",
    content: "Intercepted distress signal fragment, origin unconfirmed.",
    stored: "DAY 418",
    author: "COMMS 01",
    access: "CREW",
  },
  {
    id: "log-4471-3313",
    type: "text",
    title: "Navigation drift correction",
    code: "LOG-4471-3313",
    meta: "410 WORDS · NAV",
    category: "NAVIGATION",
    content:
      "Applied a 0.03 degree course correction to compensate for accumulated navigation drift.",
    stored: "DAY 418",
    author: "HELM 02",
    access: "CREW",
  },
  {
    id: "vid-4471-122",
    type: "video",
    title: "Reactor core walkthrough",
    code: "VID-4471-122",
    meta: "00:04:20 · ENG CAM",
    category: "ENGINEERING",
    content: "Routine visual walkthrough of the reactor core housing.",
    stored: "DAY 418",
    author: "ENGINEERING 02",
    access: "CREW",
  },
  {
    id: "aud-4471-906",
    type: "audio",
    title: "Captain's personal log",
    code: "AUD-4471-906",
    meta: "00:02:33 · PRIVATE",
    category: "COMMAND",
    content: "Personal log entry, access restricted.",
    stored: "DAY 418",
    author: "CAPTAIN",
    access: "PRIVATE",
  },
  {
    id: "log-4471-3314",
    type: "text",
    title: "Medical inventory audit",
    code: "LOG-4471-3314",
    meta: "290 WORDS · MED",
    category: "MEDICAL",
    content: "Medical bay inventory audit; all consumables within expected tolerances.",
    stored: "DAY 418",
    author: "MEDICAL 01",
    access: "CREW",
  },
];

/** Picks a random entry from {@link PREPARED_LOG_ENTRIES}, given a new unique id. */
export function pickRandomPreparedLog(): LogEntry {
  const base = PREPARED_LOG_ENTRIES[Math.floor(Math.random() * PREPARED_LOG_ENTRIES.length)];
  return { ...base, id: `${base.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}` };
}

/** Filters `entries` by log type (or `"all"`) and by a case-insensitive subject/content query. */
export function filterLogEntries(
  entries: LogEntry[],
  filter: LogEntryType | "all",
  query: string,
): LogEntry[] {
  const normalizedQuery = query.trim().toLowerCase();
  return entries.filter((entry) => {
    const matchesFilter = filter === "all" || entry.type === filter;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      entry.title.toLowerCase().includes(normalizedQuery) ||
      entry.content.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });
}
