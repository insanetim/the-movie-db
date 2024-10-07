import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockList } from 'src/__mocks__/mockList'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import PopoverContent from '../component'
import { PopoverContentHookReturn, PopoverContentProps } from '../types'

const mockedHook: PopoverContentHookReturn = {
  handleAddToList: jest.fn(),
  handleAddToNewList: jest.fn(),
  lists: {
    page: 1,
    results: [mockList],
    total_pages: 1,
    total_results: 1,
  },
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('PopoverContent component', () => {
  const user = userEvent.setup()

  const props: PopoverContentProps = {
    movieId: 1234,
    setPopoverOpen: jest.fn(),
  }

  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<PopoverContent {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleAddToList" when addToList button clicked', async () => {
    renderWithWrapper(<PopoverContent {...props} />)

    const addToListBtn = screen.getByText('test/list')
    await user.click(addToListBtn)

    expect(mockedHook.handleAddToList).toHaveBeenCalledWith({
      listId: 1234,
      listName: 'test/list',
    })
  })

  it('should call "handleAddToNewList" when createList button clicked', async () => {
    renderWithWrapper(<PopoverContent {...props} />)

    const createListBtn = screen.getByText(/create/i)
    await user.click(createListBtn)

    expect(mockedHook.handleAddToNewList).toHaveBeenCalled()
  })
})
