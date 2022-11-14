const mockHttpClient = ({ method, response, reject } = { reject: false, response: {} }) => {
  const httpClient = {
    [method]: () =>
      new Promise((resolve, deny) => {
        if (reject) {
          deny(response)
        } else {
          resolve(response)
        }
      })
  }
  const spy = jest.spyOn(httpClient, method)
  httpClient.spy = spy
  return httpClient
}

export default mockHttpClient
