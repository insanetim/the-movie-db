import * as selectors from '../selectors'

it('listsSelector', () => {
  const lists = 'test/lists'
  const state = {
    lists: {
      lists
    }
  }

  expect(selectors.listsSelector(state)).toEqual(lists)
})

it('listSelector', () => {
  const list = 'test/list'
  const state = {
    lists: {
      list
    }
  }

  expect(selectors.listSelector(state)).toEqual(list)
})
