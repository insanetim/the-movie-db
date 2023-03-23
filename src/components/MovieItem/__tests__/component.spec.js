import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import MovieItem from '../component'

const mockedHookData = {
  handleClick: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

jest.mock('src/utils', () => ({
  bindId: jest.fn(node => node)
}))

describe('MovieItem component', () => {
  it('matches snapshot', () => {
    const props = {
      movie: {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      },
      actions: [
        <div
          key='delete'
          onClick={jest.fn()}
        />
      ]
    }
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieItem {...props} />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with NoImage', () => {
    const props = {
      movie: {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: null
      }
    }
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieItem {...props} />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
