import { fireEvent, render, screen } from '@testing-library/react'
import { mockList } from 'src/__mocks__/mockList'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import PopoverContent from '../component'
import { PopoverContentHook, PopoverContentProps } from '../types'

const mockedHook: PopoverContentHook = {
  handleAddToList: jest.fn(),
  handleAddToNewList: jest.fn(),
  lists: {
    page: 1,
    results: [mockList],
    total_pages: 1,
    total_results: 1
  }
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('PopoverContent component', () => {
  const props: PopoverContentProps = {
    movieId: 123,
    setPopoverOpen: jest.fn()
  }

  it('should match snapshot', () => {
    const { asFragment } = render(<PopoverContent {...props} />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleAddToList" when addToList button clicked', () => {
    render(<PopoverContent {...props} />, { wrapper: Wrapper })
    const addToListBtn = screen.getByText('test/list')
    fireEvent.click(addToListBtn)

    expect(mockedHook.handleAddToList).toHaveBeenCalledWith(123)
  })

  it('should call "handleAddToNewList" when createList button clicked', () => {
    render(<PopoverContent {...props} />, { wrapper: Wrapper })
    const createListBtn = screen.getByText('Create new list ...')
    fireEvent.click(createListBtn)

    expect(mockedHook.handleAddToNewList).toHaveBeenCalled()
  })
})
