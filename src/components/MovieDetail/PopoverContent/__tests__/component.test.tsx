import { fireEvent, render } from '@testing-library/react'
import { mockList } from 'src/__mocks__/mockList'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import PopoverContent from '../component'
import { PopoverContentHook, PopoverContentProps } from '../types'

const mockedHookData: PopoverContentHook = {
  handleAddToList: jest.fn(),
  handleAddToNewList: jest.fn(),
  lists: {
    page: 1,
    results: [mockList],
    total_pages: 1,
    total_results: 1
  }
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('PopoverContent component', () => {
  const props: PopoverContentProps = {
    movieId: 123,
    setPopoverOpen: jest.fn()
  }

  it('matches snapshot', () => {
    const { asFragment } = render(<PopoverContent {...props} />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('handles handleAddToList', () => {
    const { getByTestId } = render(<PopoverContent {...props} />, {
      wrapper: Wrapper
    })

    fireEvent.click(getByTestId('addToListButton'))

    expect(mockedHookData.handleAddToList).toHaveBeenCalledWith(123)
  })
})
