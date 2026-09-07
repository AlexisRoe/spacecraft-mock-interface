/** Truncates `value` to at most `maxLength` characters. */
export function truncate(value: string, maxLength: number): string {
  return value.slice(0, maxLength);
}
