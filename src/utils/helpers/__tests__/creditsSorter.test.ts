import { mockedCredits } from 'src/__mocks__/mockPerson'

import { releaseDateSorter, titleSorter } from '../creditsSorters'

describe('creditsSorters', () => {
  const [a, b] = mockedCredits

  it('releaseDateSorter', () => {
    expect(releaseDateSorter(a, b)).toBe(-1)
  })

  it('titleSorter', () => {
    expect(titleSorter(a, b)).toBe(1)
  })
})
