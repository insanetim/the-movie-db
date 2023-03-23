import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render } from '@testing-library/react'
import { mergeDeepRight } from 'ramda'

import store from 'src/store'
import Movie from '../component'
import useContainer from '../hook'

const mockedHookData = {
  movie: {
    id: 1,
    title: 'test/title',
    release_date: new Date(),
    overview: 'test/overview',
    original_language: 'EN',
    runtime: 90,
    budget: 1000000,
    revenue: 1500000,
    genres: [
      { id: 1, name: 'action' },
      { id: 2, name: 'horror' }
    ],
    images: [{ file_path: 'test/image' }],
    credits: {
      cast: [{ credit_id: 1, profile_path: 'test/image', name: 'John Doe', character: 'Neo' }],
      crew: [{ credit_id: 1, profile_path: 'test/image', name: 'John Doe', job: 'Director' }]
    },
    accountStates: {
      favorite: false,
      watchlist: false
    }
  },
  loading: false,
  error: null,
  handleFavoriteClick: jest.fn(),
  handleWatchlistClick: jest.fn(),
  popoverOpen: false,
  setPopoverOpen: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Movie component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Movie />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with other data', () => {
    useContainer.mockReturnValueOnce(
      mergeDeepRight(mockedHookData, {
        movie: {
          accountStates: {
            favorite: true,
            watchlist: true
          }
        },
        popoverOpen: true
      })
    )
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Movie />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('handles setPopoverOpen', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Movie />
        </MemoryRouter>
      </Provider>
    )
    fireEvent.click(getByTestId('addMovieToListPopover'))

    expect(mockedHookData.setPopoverOpen).toHaveBeenCalled()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Movie />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = { message: 'test/error' }
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Movie />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
