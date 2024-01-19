import { mockList } from 'src/__mocks__/mockList'
import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import ListList from '../component'

jest.mock('src/store/createdLists/selectors', () => ({
  createdListsSelector: () => null,
}))

describe('ListsList component', () => {
  const mockedLists = [mockList]

  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<ListList lists={mockedLists} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
