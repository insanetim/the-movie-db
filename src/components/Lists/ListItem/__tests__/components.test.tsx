import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockList } from 'src/__mocks__/mockList'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ListItem from '../component'
import { ListItemHookReturn } from '../types'

const mockedHook: ListItemHookReturn = {
  handleClick: jest.fn(),
  handleListDelete: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ListItem component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <ListItem
        description={mockList.description}
        id={mockList.id}
        name={mockList.name}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleClick" when card clicked', async () => {
    renderWithWrapper(
      <ListItem
        description={mockList.description}
        id={mockList.id}
        name={mockList.name}
      />
    )

    const user = userEvent.setup()
    const card = screen.getByTestId('listItemCard')
    await user.click(card)

    expect(mockedHook.handleClick).toHaveBeenCalled()
  })

  it('should call "handleListDelete" when delete button clicked', async () => {
    renderWithWrapper(
      <ListItem
        description={mockList.description}
        id={mockList.id}
        name={mockList.name}
      />
    )

    const user = userEvent.setup()
    const deleteBtn = screen.getByTestId('deleteListBtn')
    await user.click(deleteBtn)

    expect(mockedHook.handleListDelete).toHaveBeenCalled()
  })
})
