import { render } from '@testing-library/react'
import { mockList } from 'src/__mocks__/mockList'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import ListList from '../component'

jest.mock('src/store/lists/selectors', () => ({
  listsSelector: jest.fn(() => null)
}))

describe('ListsList component', () => {
  const mockedLists = [mockList]

  it('matches snapshot', () => {
    const { asFragment } = render(<ListList lists={mockedLists} />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })
})
