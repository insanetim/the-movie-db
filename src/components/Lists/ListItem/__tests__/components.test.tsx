import { fireEvent, render, screen } from '@testing-library/react'
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

  it('should call "handleClick" when card clicked', () => {
    render(<ListItem list={mockList} />, { wrapper: Wrapper })
    const card = screen.getByTestId('listItemCard')
    fireEvent.click(card)

    expect(mockedHook.handleClick).toHaveBeenCalled()
  })

  it('should call "handleListDelete" when delete button clicked', () => {
    render(<ListItem list={mockList} />, { wrapper: Wrapper })
    const deleteBtn = screen.getByTestId('deleteListBtn')
    fireEvent.click(deleteBtn)

    expect(mockedHook.handleListDelete).toHaveBeenCalled()
  })
})
