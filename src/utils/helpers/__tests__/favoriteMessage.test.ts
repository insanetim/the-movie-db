import favoriteMessage from '../favoriteMessage'

describe('favoriteMessage', () => {
  it('should return message for adding item to favorites', () => {
    const result = favoriteMessage('Movie', true)

    expect(result).toBe('Movie added to Favorite')
  })

  it('should return message for removing item from favorites', () => {
    const result = favoriteMessage('Movie', false)

    expect(result).toBe('Movie removed from Favorite')
  })
})
