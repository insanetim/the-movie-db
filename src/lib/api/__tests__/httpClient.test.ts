import httpClient from '../httpClient'

describe('httpClient', () => {
  it('matches snapshot', () => {
    expect(httpClient).toMatchSnapshot()
  })
})
