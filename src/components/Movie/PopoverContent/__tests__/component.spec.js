import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render } from '@testing-library/react'

import store from 'src/store'
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
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PopoverContent />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('handles handleAddToList', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PopoverContent />
        </MemoryRouter>
      </Provider>
    )
    fireEvent.click(getByTestId('addToListButton'))

    expect(mockedHookData.handleAddToList).toHaveBeenCalledWith(123)
  })
})
