import { getAge, getFormatedDate } from '../getAge'

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

describe('getAge', () => {
  it('should return formatted age for living person', () => {
    const birthDate = '2000-01-01'
    const result = getAge(birthDate)

    expect(result).toBe('January 1, 2000 (20 years old)')
  })

  it('should return formatted age for deceased person', () => {
    const birthDate = '1960-01-01'
    const deathDate = '2000-12-01'
    const result = getAge(birthDate, deathDate)

    expect(result).toBe('December 1, 2000 (40 years old)')
  })

  it('should return formatted date without age', () => {
    const date = '2000-01-01'
    const result = getFormatedDate(date)

    expect(result).toBe('January 1, 2000')
  })
})
