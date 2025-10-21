import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockList } from 'src/__mocks__/mockList'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ListItem from '../component'
import { ListItemHookReturn } from '../types'

const mockedHook: ListItemHookReturn = {
  handleConfirmDeleteList: jest.fn(),
  handleDeleteList: jest.fn(),
  handleNavigateToList: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ListItem component', () => {
  const user = userEvent.setup()

  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <ListItem
        description={mockList.description}
        listId={mockList.id}
        name={mockList.name}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleClick" when card clicked', async () => {
    renderWithWrapper(
      <ListItem
        description={mockList.description}
        listId={mockList.id}
        name={mockList.name}
      />
    )

    const card = screen.getByTestId('listItemCard')
    await user.click(card)

    expect(mockedHook.handleNavigateToList).toHaveBeenCalled()
  })

  it('should call "handleListDelete" when delete button clicked', async () => {
    renderWithWrapper(
      <ListItem
        description={mockList.description}
        listId={mockList.id}
        name={mockList.name}
      />
    )

    const deleteBtn = screen.getByTestId('deleteListBtn')
    await user.click(deleteBtn)

    expect(mockedHook.handleConfirmDeleteList).toHaveBeenCalled()
  })
})
