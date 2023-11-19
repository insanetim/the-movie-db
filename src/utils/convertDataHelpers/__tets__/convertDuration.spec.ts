import convertDuration from '../convertDuration'

describe('convertDuration', () => {
  it('should return correct result with value 30', () => {
    expect(convertDuration(30)).toEqual('30m')
  })

  it('should return correct result with value 60', () => {
    expect(convertDuration(60)).toEqual('1h')
  })

  it('should return correct result with value 90', () => {
    expect(convertDuration(90)).toEqual('1h 30m')
  })
})
