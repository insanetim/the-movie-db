import getSlug from '../getSlug'

describe('getSlug', () => {
  it('should create slug from ID and title correctly', () => {
    const id = 1234
    const title = 'The Movie'
    const result = getSlug(id, title)

    expect(result).toBe('1234-the-movie')
  })
})
