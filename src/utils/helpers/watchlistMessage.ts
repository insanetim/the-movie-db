const watchlistMessage = (title: string, inWatchlist: boolean) => {
  return `${title} ${
    inWatchlist ? 'added to Watchlist' : 'removed from Watchlist'
  }`
}

export default watchlistMessage
