const watchlistMessage = (title: string, inWatchlist: boolean) =>
  `${title} ${inWatchlist ? 'added to Watchlist' : 'removed from Watchlist'}`

export default watchlistMessage
