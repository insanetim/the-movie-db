const favoriteMessage = (title: string, inFavorite: boolean) => {
  return `${title} ${
    inFavorite ? 'added to Favorite' : 'removed from Favorite'
  }`
}

export default favoriteMessage
