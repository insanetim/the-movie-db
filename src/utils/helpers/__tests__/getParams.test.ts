import getParams from '../getParams'

describe('getParams', () => {
  it('should return empty object for empty params', () => {
    const params = {}
    const result = getParams(params)

    expect(result).toEqual({})
  })

  it('should filter out empty page and search params', () => {
    const params = { page: '1', search: '' }
    const result = getParams(params)

    expect(result).toEqual({})
  })

  it('should include non-empty search param', () => {
    const params = { search: 'test/search' }
    const result = getParams(params)

    expect(result).toEqual({ search: 'test/search' })
  })

  it('should include non-empty page param', () => {
    const params = { page: '3' }
    const result = getParams(params)

    expect(result).toEqual({ page: '3' })
  })

  it('should include multiple non-empty params', () => {
    const params = { page: '3', search: 'test/search' }
    const result = getParams(params)

    expect(result).toEqual({ page: '3', search: 'test/search' })
  })
})
