const convertDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60)
  const minutes = duration - hours * 60
  const result = []
  if (hours > 0) result.push(`${hours}h`)
  if (minutes > 0) result.push(`${minutes}m`)
  return result.join(' ')
}

export default convertDuration
