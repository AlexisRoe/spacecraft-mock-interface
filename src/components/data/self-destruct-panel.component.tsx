import { type JSX, useEffect, useRef, useState } from "react";
import { useCodeConsoleStore } from "../../stores/code-console.store";

import "./self-destruct-panel.component.css";

const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#";
const MESSAGE = "WARNING: SELF DESTRUCT ENABLED";
const NONSENSE_WORDS = [
  "orbital",
  "fluxion",
  "gravwell",
  "kessler",
  "ionic",
  "singularity",
  "rift",
  "cascade",
  "phantom",
  "null-sector",
  "wraith",
  "echo-9",
  "voidline",
  "static",
  "hexbloom",
  "driftcore",
  "parallax",
  "umbral",
  "glitchvein",
  "zero-tide",
  "ashfall",
  "cinderloop",
];
const NONSENSE_LINE_COUNT = 5;
const ABORT_CLICKS_REQUIRED = 3;
const ABORT_WINDOW_MS = 600;
const RUBBISH_RESPONSES = [
  "##ERR_NULL_AUTH##",
  "signal lost // retry // retry",
  "@@corrupted sequence@@",
  "unknown command: <>{}#",
  "checksum mismatch: 0x00 != 0xFF",
  "...request ignored...",
];
const COUNTDOWN_START_SECONDS = 25;
const COUNTDOWN_JUMP_THRESHOLD_SECONDS = 10;

/** Randomly swaps some characters of `text` for glitch characters. */
function glitchText(text: string): string {
  return text
    .split("")
    .map((char) => {
      if (char === " ") {
        return char;
      }
      return Math.random() < 0.12
        ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        : char;
    })
    .join("");
}

/** Builds a line of nonsensical filler text for the glitch header. */
function randomNonsenseLine(): string {
  const words = Array.from(
    { length: 6 },
    () => NONSENSE_WORDS[Math.floor(Math.random() * NONSENSE_WORDS.length)],
  );
  return words.join(" ");
}

/** Builds `count` lines of nonsensical filler text. */
function randomNonsenseLines(count: number): string[] {
  return Array.from({ length: count }, randomNonsenseLine);
}

/** Picks a random rubbish terminal response. */
function randomRubbishResponse(): string {
  return RUBBISH_RESPONSES[Math.floor(Math.random() * RUBBISH_RESPONSES.length)];
}

/**
 * Glitchy terminal-style panel shown in place of the code editor once the
 * self-destruct easter egg has been triggered. The countdown never reaches
 * zero, jumping back up by a random amount instead. Clicking the "abort"
 * phrase once just returns garbled feedback; it must be clicked three
 * times in quick succession to actually cancel the self-destruct and
 * reset the program.
 */
export function SelfDestructPanel(): JSX.Element {
  const abortSelfDestruct = useCodeConsoleStore((state) => state.abortSelfDestruct);
  const [countdown, setCountdown] = useState(COUNTDOWN_START_SECONDS);
  const [nonsenseLines, setNonsenseLines] = useState(() =>
    randomNonsenseLines(NONSENSE_LINE_COUNT),
  );
  const [message, setMessage] = useState(MESSAGE);
  const [responses, setResponses] = useState<string[]>([]);
  const abortClickTimestamps = useRef<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((current) => {
        const next = current - 1;
        if (next <= COUNTDOWN_JUMP_THRESHOLD_SECONDS) {
          return next + 5 + Math.floor(Math.random() * 11);
        }
        return next;
      });
      setNonsenseLines(randomNonsenseLines(NONSENSE_LINE_COUNT));
      setMessage(glitchText(MESSAGE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleAbortClick(): void {
    const now = Date.now();
    const recent = [...abortClickTimestamps.current, now].filter(
      (timestamp) => now - timestamp <= ABORT_WINDOW_MS,
    );
    abortClickTimestamps.current = recent;

    if (recent.length >= ABORT_CLICKS_REQUIRED) {
      abortClickTimestamps.current = [];
      abortSelfDestruct();
      return;
    }

    setResponses((current) => [...current, randomRubbishResponse()]);
  }

  return (
    <div className="self-destruct-panel">
      <div className="self-destruct-panel__titlebar">
        <span className="self-destruct-panel__dot" />
        <span className="self-destruct-panel__dot" />
        <span className="self-destruct-panel__dot" />
        <span className="self-destruct-panel__title">root@spacecraft:~</span>
      </div>
      <div className="self-destruct-panel__body">
        {nonsenseLines.map((line, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: lines are regenerated wholesale on every tick
          <p className="self-destruct-panel__line" key={index}>{`> ${line}`}</p>
        ))}
        <p className="self-destruct-panel__line self-destruct-panel__line--message">{`> ${message}`}</p>
        <p className="self-destruct-panel__line self-destruct-panel__line--timer">
          {`> ${String(Math.max(countdown, 0)).padStart(2, "0")}s`}
        </p>
        <p className="self-destruct-panel__line">
          {"> To abort self-destruct click "}
          <button
            type="button"
            className="self-destruct-panel__abort-phrase"
            onClick={handleAbortClick}
          >
            "abort"
          </button>
        </p>
        {responses.map((line, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: responses are only ever appended, never reordered
          <p className="self-destruct-panel__line self-destruct-panel__line--rubbish" key={index}>
            {`> ${line}`}
          </p>
        ))}
      </div>
    </div>
  );
}
