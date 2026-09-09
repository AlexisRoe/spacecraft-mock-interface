const NUMERIC_VALUE_PATTERN = /^([+-]?)(\d+)(?:\.(\d+))?([eE][+-]?\d+)?$/;

/**
 * Randomly nudges a formatted numeric string by a proportion of its
 * magnitude, preserving its sign prefix, decimal precision, and exponent
 * suffix so drifted sensor readouts still look like the same channel.
 *
 * Values that don't match a plain numeric format (sign + digits + optional
 * decimal + optional exponent) are returned unchanged.
 */
export function jitterValue(
  value: string,
  rng: () => number = Math.random,
  volatility = 0.06,
): string {
  const match = value.match(NUMERIC_VALUE_PATTERN);
  if (!match) {
    return value;
  }

  const [, sign, intDigits, decDigits, exponent] = match;
  const decimals = decDigits?.length ?? 0;
  const magnitude = Number(`${sign}${intDigits}${decDigits ? `.${decDigits}` : ""}`);

  const noiseFloor = magnitude === 0 ? volatility : Math.abs(magnitude) * volatility;
  const drifted = magnitude + (rng() - 0.5) * 2 * noiseFloor;

  const formatted = drifted.toFixed(decimals);
  const withSign = sign === "+" && !formatted.startsWith("-") ? `+${formatted}` : formatted;

  return `${withSign}${exponent ?? ""}`;
}
