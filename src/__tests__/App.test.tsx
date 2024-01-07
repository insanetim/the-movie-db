import { screen } from '@testing-library/react'
import { Location } from 'react-router-dom'
import { mockListDetail } from 'src/__mocks__/mockList'
import { mockMovieDetailExtended } from 'src/__mocks__/mockMovie'
import App, {
  Dashboard,
  DefaultLayout,
  Favorite,
  ListDetail,
  Lists,
  Login,
  MovieDetail,
  NotFound,
  Watchlist,
} from 'src/App'
import { TrendingHook } from 'src/components/Dashboard/Trending/types'
import { ModalRootHook } from 'src/components/ModalRoot/types'
import { NotificationsRootHook } from 'src/components/NotificationsRoot/types'
import { ProtectedRoutesHook } from 'src/components/ProtectedRoutes/types'
import { HeaderHook } from 'src/layouts/Default/Header/types'
import { DashboardHook } from 'src/pages/Dashboard/types'
import { FavoriteHook } from 'src/pages/Favorite/types'
import { ListDetailHook } from 'src/pages/ListDetail/types'
import { ListsHook } from 'src/pages/Lists/types'
import { LoginHook } from 'src/pages/Login/types'
import { MovieDetailHook } from 'src/pages/MovieDetail/types'
import { WatchlistHook } from 'src/pages/Watchlist/types'
import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

const mockedProtectedRoutesHook: ProtectedRoutesHook = {
  isAuthenticated: false,
  location: {} as Location,
}
jest.mock('../components/ProtectedRoutes/hook', () =>
  jest.fn(() => mockedProtectedRoutesHook)
)

const mockedModalRootHook: ModalRootHook = {
  modalProps: null,
  modalType: null,
  onCancel: jest.fn(),
}
jest.mock('../components/ModalRoot/hook', () =>
  jest.fn(() => mockedModalRootHook)
)

const mockedNotificationsRootHook: NotificationsRootHook = {
  hideNotification: jest.fn(),
  notifications: [],
}
jest.mock('../components/NotificationsRoot/hook', () =>
  jest.fn(() => mockedNotificationsRootHook)
)

const mockedHeaderHook: HeaderHook = {
  account: null,
  handleLogOut: jest.fn(),
}
jest.mock('../layouts/Default/Header/hook', () =>
  jest.fn(() => mockedHeaderHook)
)

const mockedLoginHook: LoginHook = {
  handleLogIn: jest.fn(),
  isSubmitting: false,
}
jest.mock('../pages/Login/hook', () => jest.fn(() => mockedLoginHook))

const mockedDashboardHook: DashboardHook = {
  query: '',
}
jest.mock('../pages/Dashboard/hook', () => jest.fn(() => mockedDashboardHook))

const mockedTrendingHook: TrendingHook = {
  error: null,
  handlePagination: () => jest.fn(),
  loading: false,
  movies: null,
}
jest.mock('../components/Dashboard/Trending/hook', () =>
  jest.fn(() => mockedTrendingHook)
)

const mockedListsHook: ListsHook = {
  error: null,
  handleCreateList: jest.fn(),
  handlePagination: jest.fn(),
  lists: null,
  loading: false,
}
jest.mock('../pages/Lists/hook', () => jest.fn(() => mockedListsHook))

const mockedWatchlistHook: WatchlistHook = {
  error: null,
  handleMovieDelete: jest.fn(),
  handlePagination: jest.fn(),
  loading: false,
  movies: null,
}
jest.mock('../pages/Watchlist/hook', () => jest.fn(() => mockedWatchlistHook))

const mockedFavoriteHook: FavoriteHook = {
  error: null,
  handleMovieDelete: jest.fn(),
  handlePagination: jest.fn(),
  loading: false,
  movies: null,
}
jest.mock('../pages/Favorite/hook', () => jest.fn(() => mockedFavoriteHook))

const mockedListDetailHook: ListDetailHook = {
  error: null,
  handleListDelete: jest.fn(),
  handleMovieDelete: jest.fn(),
  handlePagination: jest.fn(),
  list: mockListDetail,
  loading: false,
}
jest.mock('../pages/ListDetail/hook', () => jest.fn(() => mockedListDetailHook))

const mockedMovieDetailHook: MovieDetailHook = {
  error: null,
  handleFavoriteClick: jest.fn(),
  handleWatchlistClick: jest.fn(),
  loading: false,
  movie: mockMovieDetailExtended,
  popoverOpen: false,
  setPopoverOpen: jest.fn(),
}
jest.mock('../pages/MovieDetail/hook', () =>
  jest.fn(() => mockedMovieDetailHook)
)

describe('App component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<App />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render DefaultLayout', async () => {
    renderWithWrapper(<DefaultLayout />)

    expect(
      await screen.findByText(/insanetim/i, undefined, { timeout: 3000 })
    ).toBeInTheDocument()
  })

  it('should render Login', async () => {
    renderWithWrapper(<Login />)

    expect(await screen.findByText(/log in/i)).toBeInTheDocument()
  })

  it('should render Dashboard', async () => {
    renderWithWrapper(<Dashboard />)

    expect(
      await screen.findByPlaceholderText(/enter/i, undefined, { timeout: 3000 })
    ).toBeInTheDocument()
  })

  it('should render Lists', async () => {
    renderWithWrapper(<Lists />)

    expect(await screen.findByText(/my lists/i)).toBeInTheDocument()
  })

  it('should render Watchlist', async () => {
    renderWithWrapper(<Watchlist />)

    expect(await screen.findByText(/watchlist/i)).toBeInTheDocument()
  })

  it('should render Favorite', async () => {
    renderWithWrapper(<Favorite />)

    expect(await screen.findByText(/favorite/i)).toBeInTheDocument()
  })

  it('should render ListDetail', async () => {
    renderWithWrapper(<ListDetail />)

    expect(await screen.findByText(/title/i)).toBeInTheDocument()
  })

  it('should render MovieDetail', async () => {
    renderWithWrapper(<MovieDetail />)

    expect(
      await screen.findByText(/title/i, undefined, { timeout: 3000 })
    ).toBeInTheDocument()
  })

  it('should render NotFound', async () => {
    renderWithWrapper(<NotFound />)

    expect(await screen.findByText(/oops!/i)).toBeInTheDocument()
  })
})
