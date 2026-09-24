/**
 * Generate a unique ID using crypto.randomUUID
 * @returns {string} UUID v4
 */
export function generateId() {
  return crypto.randomUUID();
}
