import getIdFromSlug from '../getIdFromSlug'

describe('getIdFromSlug', () => {
  it('should extract ID from slug correctly', () => {
    const slug = '1234-the-movie'
    const result = getIdFromSlug(slug)

    expect(result).toBe(1234)
  })
})
