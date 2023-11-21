import getParams from '../getParams'

describe('getParams', () => {
  it('should return correct value', () => {
    const result = getParams({})

    expect(result).toEqual({})
  })

  it('should return correct value', () => {
    const result = getParams({ page: '1', search: '' })

    expect(result).toEqual({})
  })

  it('should return correct value', () => {
    const result = getParams({ search: 'test/search' })

    expect(result).toEqual({ search: 'test/search' })
  })

  it('should return correct value', () => {
    const result = getParams({ page: '3' })

    expect(result).toEqual({ page: '3' })
  })

  it('should return correct value', () => {
    const result = getParams({ page: '3', search: 'test/search' })

    expect(result).toEqual({ page: '3', search: 'test/search' })
  })
})
