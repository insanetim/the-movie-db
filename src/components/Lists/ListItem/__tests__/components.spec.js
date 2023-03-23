import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import ListItem from '../component'

const mockedHookData = {
  handleClick: jest.fn(),
  handleDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ListItem component', () => {
  it('matches snapshot', () => {
    const mockedList = {
      id: 1,
      name: 'test/name',
      description: 'test/description'
    }
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListItem list={mockedList} />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
