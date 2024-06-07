import { getAge, getFormatedDate } from '../getAge'

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

describe('getAge', () => {
  it('getAge without deathday should return correct value', () => {
    const result = getAge('2000-01-01')

    expect(result).toBe('January 1, 2000 (20 years old)')
  })

  it('getAge with deathday should return correct value', () => {
    const result = getAge('1960-01-01', '2000-12-01')

    expect(result).toBe('December 1, 2000 (40 years old)')
  })

  it('getFormatedDate should return correct value', () => {
    const result = getFormatedDate('2000-01-01')

    expect(result).toBe('January 1, 2000')
  })
})
