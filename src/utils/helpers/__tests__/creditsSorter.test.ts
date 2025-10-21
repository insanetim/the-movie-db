import { mockedCredits } from 'src/__mocks__/mockPerson'

import { releaseDateSorter, titleSorter } from '../creditsSorters'

describe('creditsSorters', () => {
  const [firstCredit, secondCredit] = mockedCredits

  it('should sort credits by release date in ascending order', () => {
    const result = releaseDateSorter(firstCredit, secondCredit)

    expect(result).toBe(-1)
  })

  it('should sort credits by title in descending order', () => {
    const result = titleSorter(firstCredit, secondCredit)

    expect(result).toBe(1)
  })
})
