import getSlug from '../getSlug'

describe('getSlug', () => {
  it('should return correct value', () => {
    const result = getSlug(1234, 'The Movie')

    expect(result).toBe('1234-the-movie')
  })
})
