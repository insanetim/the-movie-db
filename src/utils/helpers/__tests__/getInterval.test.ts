import getInterval from '../getInterval'

describe('getInterval', () => {
  it('should return correct interval for hours', () => {
    const result = getInterval(2, 'hours')
    expect(result).toBe(2 * 60 * 60 * 1000)
  })

  it('should return correct interval for minutes', () => {
    const result = getInterval(5, 'minutes')
    expect(result).toBe(5 * 60 * 1000)
  })

  it('should return correct interval for seconds', () => {
    const result = getInterval(10, 'seconds')
    expect(result).toBe(10 * 1000)
  })

  it('should return 0 for zero count', () => {
    const result = getInterval(0, 'seconds')
    expect(result).toBe(0)
  })
})
