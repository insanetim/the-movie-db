import isNull from '../isNull'

describe('isNull()', () => {
  it('returns true', () => {
    const x = null
    expect(isNull(x)).toBe(true)
  })

  it('returns false', () => {
    const x = {}
    expect(isNull(x)).toBe(false)
  })
})
