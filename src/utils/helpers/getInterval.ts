const getInterval = (
  count: number,
  units: 'hours' | 'minutes' | 'seconds'
): number => {
  const multipliers = {
    hours: 60 * 60 * 1000,
    minutes: 60 * 1000,
    seconds: 1000,
  }

  return count * multipliers[units]
}

export default getInterval
