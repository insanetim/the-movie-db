const favoriteMessage = (title: string, inFavorite: boolean) =>
  `${title} ${inFavorite ? 'added to Favorite' : 'removed from Favorite'}`

export default favoriteMessage
