import * as selectors from '../selectors'

describe('lists selectors', () => {
  it('listsSelector', () => {
    const lists = 'test/lists'
    const state = { lists: { lists: { lists } } }

    expect(selectors.listsSelector(state)).toEqual(lists)
  })

  it('listsPageSelector', () => {
    const page = 'test/page'
    const state = { lists: { lists: { page } } }

    expect(selectors.listsPageSelector(state)).toEqual(page)
  })

  it('listsLoadingSelector', () => {
    const loading = 'test/loading'
    const state = { lists: { lists: { loading } } }

    expect(selectors.listsLoadingSelector(state)).toEqual(loading)
  })

  it('listsErrorSelector', () => {
    const error = 'test/error'
    const state = { lists: { lists: { error } } }

    expect(selectors.listsErrorSelector(state)).toEqual(error)
  })

  it('listSelector', () => {
    const list = 'test/list'
    const state = { lists: { list: { list } } }

    expect(selectors.listSelector(state)).toEqual(list)
  })

  it('listLoadingSelector', () => {
    const loading = 'test/loading'
    const state = { lists: { list: { loading } } }

    expect(selectors.listLoadingSelector(state)).toEqual(loading)
  })

  it('listErrorSelector', () => {
    const error = 'test/error'
    const state = { lists: { list: { error } } }

    expect(selectors.listErrorSelector(state)).toEqual(error)
  })
})
