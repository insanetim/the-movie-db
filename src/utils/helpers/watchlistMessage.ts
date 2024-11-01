const watchlistMessage = (title: string, inWatchlist: boolean) =>
  `${title} ${inWatchlist ? 'added to' : 'removed from'} Watchlist`

export default watchlistMessage
