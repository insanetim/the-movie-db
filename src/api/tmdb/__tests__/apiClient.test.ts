import tmdbClient from '../apiClient'

describe('tmdbClient', () => {
  it('should match snapshot', () => {
    expect(tmdbClient).toMatchSnapshot()
  })
})
