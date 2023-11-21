import convertDuration from '../convertDuration'

describe('convertDuration', () => {
  it('should return correct value', () => {
    const result = convertDuration(30)

    expect(result).toEqual('30m')
  })

  it('should return correct value', () => {
    const result = convertDuration(60)

    expect(result).toEqual('1h')
  })

  it('should return correct value', () => {
    const result = convertDuration(90)

    expect(result).toEqual('1h 30m')
  })
})
