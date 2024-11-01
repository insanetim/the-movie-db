const favoriteMessage = (title: string, inFavorite: boolean) =>
  `${title} ${inFavorite ? 'added to' : 'removed from'} Favorite`

export default favoriteMessage
