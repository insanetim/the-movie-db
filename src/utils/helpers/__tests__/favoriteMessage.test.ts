import favoriteMessage from '../favoriteMessage'

describe('favoriteMessage', () => {
  it('returns correct value', () => {
    expect(favoriteMessage('Movie', true)).toBe('Movie added to Favorite')
  })

  it('returns correct value', () => {
    expect(favoriteMessage('Movie', false)).toBe('Movie removed from Favorite')
  })
})
