import getInterval from '../getInterval'

describe('getInterval', () => {
  it('should return correct interval for hours', () => {
    const count = 2
    const unit = 'hours'
    const result = getInterval(count, unit)

    expect(result).toBe(2 * 60 * 60 * 1000)
  })

  it('should return correct interval for minutes', () => {
    const count = 5
    const unit = 'minutes'
    const result = getInterval(count, unit)

    expect(result).toBe(5 * 60 * 1000)
  })

  it('should return correct interval for seconds', () => {
    const count = 10
    const unit = 'seconds'
    const result = getInterval(count, unit)

    expect(result).toBe(10 * 1000)
  })

  it('should return 0 for zero count', () => {
    const count = 0
    const unit = 'seconds'
    const result = getInterval(count, unit)

    expect(result).toBe(0)
  })
})
