import convertDuration from '../convertDuration'

describe('convertDuration', () => {
  it('should convert minutes only duration to minutes format', () => {
    const minutes = 30
    const result = convertDuration(minutes)

    expect(result).toEqual('30m')
  })

  it('should convert hours only duration to hours format', () => {
    const minutes = 60
    const result = convertDuration(minutes)

    expect(result).toEqual('1h')
  })

  it('should convert mixed duration to hours and minutes format', () => {
    const minutes = 90
    const result = convertDuration(minutes)

    expect(result).toEqual('1h 30m')
  })
})
