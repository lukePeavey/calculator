/**
 * Adjusts fontsize based on the length of the display value, so the
 * value fits in the display area.
 *
 * @param {String} value - the current display value
 * @param {String} mode - the current mode (basic|[])
 * @returns {String} css fontSize value
 */
export default function(value, mode) {
  let overflow = value.slice(mode === 'basic' ? 12 : 32).length
  return mode === 'basic'
    ? `${100 - overflow * (overflow < 11 ? 5 : 4)}%`
    : `${100 - overflow * (overflow < 8 ? 2.5 : 2)}%`
}
