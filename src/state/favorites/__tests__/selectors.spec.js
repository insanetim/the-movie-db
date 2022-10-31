import * as selectors from '../selectors'

it('favoritesSelector', () => {
  const favorites = 'test/favorites'
  const state = {
    favorites: {
      favorites
    }
  }

  expect(selectors.favoritesSelector(state)).toEqual(favorites)
})
