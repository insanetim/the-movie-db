import getAge from '../getAge'

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

describe('getAge', () => {
  it('should return correct value', () => {
    const result = getAge('2000-01-01')

    expect(result).toBe('January 1, 2000 (20 years old)')
  })
})
