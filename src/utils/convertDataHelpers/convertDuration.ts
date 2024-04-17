const convertDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const parts = []
  hours && parts.push(`${hours}h`)
  minutes && parts.push(`${minutes}m`)
  return parts.join(' ')
}

export default convertDuration
