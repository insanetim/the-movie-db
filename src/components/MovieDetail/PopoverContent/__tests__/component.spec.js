import { fireEvent, render } from '@testing-library/react'

import Wrapper from 'src/__mocks__/wrapperMock'
import PopoverContent from '../component'

const mockedHookData = {
  lists: {
    results: [{ id: 123, name: 'test/list' }]
  },
  handleAddToNewList: jest.fn(),
  handleAddToList: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('PopoverContent component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<PopoverContent />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('handles handleAddToList', () => {
    const { getByTestId } = render(<PopoverContent />, { wrapper: Wrapper })
    fireEvent.click(getByTestId('addToListButton'))

    expect(mockedHookData.handleAddToList).toHaveBeenCalledWith(123)
  })
})
