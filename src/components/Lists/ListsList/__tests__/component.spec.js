import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import ListList from '../component'

const mockedHookData = {
  handlePaginationChange: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ListsList component', () => {
  it('matches snapshot', () => {
    const mockedLists = {
      results: [
        {
          id: 1,
          title: 'test/title',
          overview: 'test/overview',
          poster_path: 'test/image'
        }
      ],
      total_pages: 10,
      total_results: 200
    }
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListList lists={mockedLists} />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with 1 page', () => {
    const mockedLists = {
      results: [
        {
          id: 1,
          title: 'test/title',
          overview: 'test/overview',
          poster_path: 'test/image'
        }
      ],
      total_pages: 1,
      total_results: 20
    }
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListList lists={mockedLists} />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without lists', () => {
    const mockedLists = {
      results: []
    }
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListList lists={mockedLists} />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
