import watchlistMessage from '../watchlistMessage'

describe('watchlistMessage', () => {
  it('should return correct value', () => {
    const result = watchlistMessage('Movie', true)

    expect(result).toBe('Movie added to Watchlist')
  })

  it('should return correct value', () => {
    const result = watchlistMessage('Movie', false)

    expect(result).toBe('Movie removed from Watchlist')
  })
})
