import getParams from '../getParams'

describe('getParams', () => {
  it('returns correct value', () => {
    expect(getParams({})).toEqual({})
  })

  it('returns correct value', () => {
    expect(getParams({ page: '1', search: '' })).toEqual({})
  })

  it('returns correct value', () => {
    expect(getParams({ search: 'test/search' })).toEqual({
      search: 'test/search'
    })
  })

  it('returns correct value', () => {
    expect(getParams({ page: '3' })).toEqual({ page: '3' })
  })

  it('returns correct value', () => {
    expect(getParams({ page: '3', search: 'test/search' })).toEqual({
      page: '3',
      search: 'test/search'
    })
  })
})
