import isPresent from '../isPresent'

describe('isPresent', () => {
  it('should return correct value', () => {
    const result = isPresent('test-value')

    expect(result).toBe(true)
  })

  it('should return correct value', () => {
    const result = isPresent('')

    expect(result).toBe(false)
  })

  it('should return correct value', () => {
    const result = isPresent(null)

    expect(result).toBe(false)
  })
})
