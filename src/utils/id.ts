/**
 * Generate a unique ID using crypto.randomUUID
 * @returns {string} UUID v4
 */
export function generateId(): string {
  return crypto.randomUUID();
}
