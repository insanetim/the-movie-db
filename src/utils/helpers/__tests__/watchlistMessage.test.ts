import watchlistMessage from '../watchlistMessage'

describe('watchlistMessage', () => {
  it('returns correct value', () => {
    expect(watchlistMessage('Movie', true)).toBe('Movie added to Watchlist')
  })

  it('returns correct value', () => {
    expect(watchlistMessage('Movie', false)).toBe(
      'Movie removed from Watchlist'
    )
  })
})
