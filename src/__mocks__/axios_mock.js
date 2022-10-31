function mockAxios() {
  const request = jest.fn()
  const mockedInterceptorsManager = {
    use: jest.fn(() => ({ type: 'interceptor-usage-token' })),
    eject: jest.fn()
  }
  const mockedProxyClient = Object.assign(request, {
    request,
    interceptors: {
      request: mockedInterceptorsManager,
      response: mockedInterceptorsManager
    },
    get: jest.fn((url, config) => request({ ...config, url, method: 'get' })),
    delete: jest.fn((url, config) => request({ ...config, url, method: 'delete' })),
    head: jest.fn((url, config) => request({ ...config, url, method: 'head' })),
    options: jest.fn((url, config) => request({ ...config, url, method: 'options' })),
    post: jest.fn((url, config) => request({ ...config, url, method: 'post' })),
    put: jest.fn((url, data, config) => request({ ...config, url, method: 'put', data })),
    patch: jest.fn((url, config) => request({ ...config, url, method: 'patch' }))
  })

  return mockedProxyClient
}

export default mockAxios
