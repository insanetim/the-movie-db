import imdbClient from '../apiClient'

describe('imdbClient', () => {
  it('should match snapshot', () => {
    expect(imdbClient).toMatchSnapshot()
  })
})
