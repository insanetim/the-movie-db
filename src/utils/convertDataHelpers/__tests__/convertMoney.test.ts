import convertMoney from '../convertMoney'

describe('convertMoney', () => {
  it('should format money amount with dollar sign and commas', () => {
    const amount = 1000
    const result = convertMoney(amount)

    expect(result).toEqual('$1,000')
  })
})
