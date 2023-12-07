import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockList } from 'src/__mocks__/mockList'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import ListItem from '../component'
import { ListItemHook } from '../types'

const mockedHook: ListItemHook = {
  handleClick: jest.fn(),
  handleListDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ListItem component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<ListItem list={mockList} />, {
      wrapper: Wrapper
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleClick" when card clicked', async () => {
    render(<ListItem list={mockList} />, { wrapper: Wrapper })

    const user = userEvent.setup()
    const card = screen.getByTestId('listItemCard')
    await user.click(card)

    expect(mockedHook.handleClick).toHaveBeenCalled()
  })

  it('should call "handleListDelete" when delete button clicked', async () => {
    render(<ListItem list={mockList} />, { wrapper: Wrapper })

    const user = userEvent.setup()
    const deleteBtn = screen.getByTestId('deleteListBtn')
    await user.click(deleteBtn)

    expect(mockedHook.handleListDelete).toHaveBeenCalled()
  })
})
