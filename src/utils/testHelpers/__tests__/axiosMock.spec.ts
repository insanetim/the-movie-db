import mockAxios from '../axiosMock'

describe('mockAxios()', () => {
  const axios = mockAxios()
  const url = '/base'
  const config = { prop: 'value' }

  it('request is axios', () => {
    expect(axios.request).toBe(axios)
  })

  it("interceptor's tag", () => {
    expect(axios.interceptors.request.use()).toStrictEqual({ type: 'interceptor-usage-token' })
  })

  it('get method', () => {
    axios.get(url, config)
    expect(axios.request).toHaveBeenCalledWith({ ...config, url, method: 'get' })
  })

  it('delete method', () => {
    axios.delete(url, config)
    expect(axios.request).toHaveBeenCalledWith({ ...config, url, method: 'delete' })
  })

  it('head method', () => {
    axios.head(url, config)
    expect(axios.request).toHaveBeenCalledWith({ ...config, url, method: 'head' })
  })

  it('options method', () => {
    axios.options(url, config)
    expect(axios.request).toHaveBeenCalledWith({ ...config, url, method: 'options' })
  })

  it('post method', () => {
    axios.post(url, config)
    expect(axios.request).toHaveBeenCalledWith({ ...config, url, method: 'post' })
  })

  it('put method', () => {
    axios.put(url, 'data', config)
    expect(axios.request).toHaveBeenCalledWith({ ...config, url, method: 'put', data: 'data' })
  })

  it('patch method', () => {
    axios.patch(url, config)
    expect(axios.request).toHaveBeenCalledWith({ ...config, url, method: 'patch' })
  })
})
