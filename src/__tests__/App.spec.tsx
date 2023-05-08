import { ReactNode, Suspense } from 'react'
import type { Location } from 'react-router-dom'
import { render } from '@testing-library/react'

import type { ProtectedRoutesHook } from 'src/components/ProtectedRoutes/types'
import type { ModalRootHook } from 'src/components/ModalRoot/types'
import type { NotificationsRootHook } from 'src/components/NotificationsRoot/types'
import type { LoginHook } from 'src/pages/Login/types'
import type { DashboardHook } from 'src/pages/Dashboard/types'
import type { TrendingHook } from 'src/components/Dashboard/Trending/types'
import type { ListsHook } from 'src/pages/Lists/types'
import type { FavoriteHook } from 'src/pages/Favorite/types'
import type { WatchlistHook } from 'src/pages/Watchlist/types'
import type { ListDetailHook } from 'src/pages/ListDetail/types'
import type { MovieDetailHook } from 'src/pages/MovieDetail/types'
import { mockMovie, mockMovieDetail } from 'src/__mocks__/mockMovie'
import { mockList, mockListDetail } from 'src/__mocks__/mockList'
import Wrapper from 'src/utils/testHelpers/wrapperMock'
import App, { Dashboard, Login, Lists, Watchlist, Favorite, ListDetail, MovieDetail } from 'src/App'

const mockedProtectedRoutesHook: ProtectedRoutesHook = {
  sessionId: '',
  location: {} as Location
}
jest.mock('../components/ProtectedRoutes/hook', () => jest.fn(() => mockedProtectedRoutesHook))

const mockedModalRootHook: ModalRootHook = {
  modalType: null,
  modalProps: null,
  onCancel: jest.fn()
}
jest.mock('../components/ModalRoot/hook', () => jest.fn(() => mockedModalRootHook))

const mockedNotificationsRootHook: NotificationsRootHook = {
  notifications: [],
  hideNotification: jest.fn()
}
jest.mock('../components/NotificationsRoot/hook', () => jest.fn(() => mockedNotificationsRootHook))

const mockedLoginHook: LoginHook = {
  loading: false,
  handleLogIn: jest.fn()
}
jest.mock('../pages/Login/hook', () => jest.fn(() => mockedLoginHook))

const mockedDashboardHook: DashboardHook = {
  query: ''
}
jest.mock('../pages/Dashboard/hook', () => jest.fn(() => mockedDashboardHook))

const mockedTrendingHook: TrendingHook = {
  movies: {
    page: 1,
    results: [mockMovie],
    total_pages: 10,
    total_results: 200
  },
  loading: false,
  error: null,
  handlePagination: () => jest.fn()
}
jest.mock('../components/Dashboard/Trending/hook', () => jest.fn(() => mockedTrendingHook))

const mockedListsHook: ListsHook = {
  lists: {
    page: 1,
    results: [mockList],
    total_pages: 1,
    total_results: 1
  },
  loading: false,
  error: null,
  handlePagination: jest.fn(),
  handleCreateList: jest.fn()
}
jest.mock('../pages/Lists/hook', () => jest.fn(() => mockedListsHook))

const mockedWatchlistHook: WatchlistHook = {
  movies: {
    page: 1,
    results: [mockMovie],
    total_pages: 1,
    total_results: 1
  },
  loading: false,
  error: null,
  handlePagination: jest.fn(),
  handleMovieDelete: jest.fn()
}
jest.mock('../pages/Watchlist/hook', () => jest.fn(() => mockedWatchlistHook))

const mockedFavoriteHook: FavoriteHook = {
  movies: {
    page: 1,
    results: [mockMovie],
    total_pages: 1,
    total_results: 1
  },
  loading: false,
  error: null,
  handlePagination: jest.fn(),
  handleMovieDelete: jest.fn()
}
jest.mock('../pages/Favorite/hook', () => jest.fn(() => mockedFavoriteHook))

const mockedListDetailHook: ListDetailHook = {
  list: mockListDetail,
  loading: false,
  error: null,
  handleListDelete: jest.fn(),
  handleMovieDelete: jest.fn()
}
jest.mock('../pages/ListDetail/hook', () => jest.fn(() => mockedListDetailHook))

const mockedMovieDetailHook: MovieDetailHook = {
  movie: mockMovieDetail,
  loading: false,
  error: null,
  handleFavoriteClick: jest.fn(),
  handleWatchlistClick: jest.fn(),
  popoverOpen: false,
  setPopoverOpen: jest.fn()
}
jest.mock('../pages/MovieDetail/hook', () => jest.fn(() => mockedMovieDetailHook))

describe('App component', () => {
  const WrapperWithSuspense = ({ children }: { children: ReactNode }) => (
    <Suspense fallback={null}>
      <Wrapper>{children}</Wrapper>
    </Suspense>
  )

  it('matches snapshot', () => {
    const { asFragment } = render(<App />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Login', async () => {
    const { findByText } = render(<Login />, { wrapper: WrapperWithSuspense })

    expect(await findByText('Log in')).toBeInTheDocument()
  })

  it('renders Dashboard', async () => {
    const { findByPlaceholderText } = render(<Dashboard />, { wrapper: WrapperWithSuspense })

    expect(await findByPlaceholderText('Enter movie name')).toBeInTheDocument()
  })

  it('renders Lists', async () => {
    const { findByText } = render(<Lists />, { wrapper: WrapperWithSuspense })

    expect(await findByText('My Lists', { exact: false })).toBeInTheDocument()
  })

  it('renders Watchlist', async () => {
    const { findByText } = render(<Watchlist />, { wrapper: WrapperWithSuspense })

    expect(await findByText('Watchlist')).toBeInTheDocument()
  })

  it('renders Favorite', async () => {
    const { findByText } = render(<Favorite />, { wrapper: WrapperWithSuspense })

    expect(await findByText('Favorite')).toBeInTheDocument()
  })

  it('renders ListDetail', async () => {
    const { findByText } = render(<ListDetail />, { wrapper: WrapperWithSuspense })

    expect(await findByText('test/title')).toBeInTheDocument()
  })

  it('renders MovieDetail', async () => {
    const { findByText } = render(<MovieDetail />, { wrapper: WrapperWithSuspense })

    expect(await findByText('test/title', { exact: false }, { timeout: 2000 })).toBeInTheDocument()
  })
})
