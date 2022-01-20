/**
 *
 * @param {string} str
 * @returns {string}
 */
export default function slugify(str) {
  return str.replace(/\s+/g, "-").toLowerCase();
}
