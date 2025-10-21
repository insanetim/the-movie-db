import watchlistMessage from '../watchlistMessage'

describe('watchlistMessage', () => {
  it('should return message for adding item to watchlist', () => {
    const result = watchlistMessage('Movie', true)

    expect(result).toBe('Movie added to Watchlist')
  })

  it('should return message for removing item from watchlist', () => {
    const result = watchlistMessage('Movie', false)

    expect(result).toBe('Movie removed from Watchlist')
  })
})
