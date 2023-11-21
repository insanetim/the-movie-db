import favoriteMessage from '../favoriteMessage'

describe('favoriteMessage', () => {
  it('should return correct value', () => {
    const result = favoriteMessage('Movie', true)

    expect(result).toBe('Movie added to Favorite')
  })

  it('should return correct value', () => {
    const result = favoriteMessage('Movie', false)

    expect(result).toBe('Movie removed from Favorite')
  })
})
