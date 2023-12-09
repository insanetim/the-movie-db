import { render } from '@testing-library/react'
import { mockList } from 'src/__mocks__/mockList'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import ListList from '../component'

jest.mock('src/store/lists/selectors', () => ({
  listsSelector: () => null,
}))

describe('ListsList component', () => {
  const mockedLists = [mockList]

  it('should match snapshot', () => {
    const { asFragment } = render(<ListList lists={mockedLists} />, {
      wrapper: Wrapper,
    })

    expect(asFragment()).toMatchSnapshot()
  })
})
