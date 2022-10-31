import { convertDuration, convertMoney } from '../index'

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

describe('convertMoney', () => {
  it('should return correct result', () => {
    expect(convertMoney(1000)).toEqual('$1,000.00')
  })
})
