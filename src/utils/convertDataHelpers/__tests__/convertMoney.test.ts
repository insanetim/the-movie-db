import convertMoney from '../convertMoney'

describe('convertMoney', () => {
  it('should return correct value', () => {
    const result = convertMoney(1000)

    expect(result).toEqual('$1,000')
  })
})
