/**
 * Converts a duration in minutes to a string in the format "Xh Ym" if hours
 * are present, otherwise "Xm".
 *
 * @param {number} totalMinutes The total number of minutes.
 * @return {string} A string representation of the duration.
 */
const convertDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const parts: string[] = []
  if (hours) {
    parts.push(`${hours}h`)
  }
  if (minutes) {
    parts.push(`${minutes}m`)
  }
  return parts.join(' ')
}

export default convertDuration
