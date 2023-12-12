import httpClient from '../httpClient'

describe('httpClient', () => {
  it('should match snapshot', () => {
    expect(httpClient).toMatchSnapshot()
  })
})
