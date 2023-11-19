import convertMoney from '../convertMoney'

describe('convertMoney', () => {
  it('should return correct result', () => {
    expect(convertMoney(1000)).toEqual('$1,000')
  })
})
