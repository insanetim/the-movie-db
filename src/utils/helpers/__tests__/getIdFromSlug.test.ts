import getIdFromSlug from '../getIdFromSlug'

describe('getSlug', () => {
  it('should return correct value', () => {
    const result = getIdFromSlug('1234-the-movie')

    expect(result).toBe(1234)
  })
})
