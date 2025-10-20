import { screen } from '@testing-library/react'
import { Location } from 'react-router-dom'
import { mockListDetails } from 'src/__mocks__/mockList'
import { mockMovieDetailsExtended } from 'src/__mocks__/mockMovie'
import { mockedCredits, mockPersonDetails } from 'src/__mocks__/mockPerson'
import App, {
  Cast,
  Credits,
  Dashboard,
  DefaultLayout,
  Favorite,
  ListDetails,
  Lists,
  Login,
  MovieDetails,
  NotFound,
  PersonDetails,
  Watchlist,
} from 'src/App'
import { TrendingHookReturn } from 'src/components/Dashboard/Trending/types'
import { ModalRootHookReturn } from 'src/components/ModalRoot/types'
import { NotificationsRootHookReturn } from 'src/components/NotificationsRoot/types'
import { ProtectedRoutesHookReturn } from 'src/components/ProtectedRoutes/types'
import { HeaderHookReturn } from 'src/layouts/Default/Header/types'
import { CastHookReturn } from 'src/pages/Cast/types'
import { CreditsHookReturn } from 'src/pages/Credits/types'
import { DashboardHookReturn } from 'src/pages/Dashboard/types'
import { FavoriteHookReturn } from 'src/pages/Favorite/types'
import { ListDetailsHookReturn } from 'src/pages/ListDetails/types'
import { ListsHookReturn } from 'src/pages/Lists/types'
import { LoginHookReturn } from 'src/pages/Login/types'
import { MovieDetailsHookReturn } from 'src/pages/MovieDetails/types'
import { PersonDetailsHookReturn } from 'src/pages/PersonDetails/types'
import { WatchlistHookReturn } from 'src/pages/Watchlist/types'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

const mockedProtectedRoutesHook: ProtectedRoutesHookReturn = {
  location: {} as Location,
  sessionId: null,
}
jest.mock('../components/ProtectedRoutes/hook', () =>
  jest.fn(() => mockedProtectedRoutesHook)
)

const mockedModalRootHook: ModalRootHookReturn = {
  modalProps: null,
  modalType: null,
  onCancel: jest.fn(),
}
jest.mock('../components/ModalRoot/hook', () =>
  jest.fn(() => mockedModalRootHook)
)

const mockedNotificationsRootHook: NotificationsRootHookReturn = {
  hideNotification: jest.fn(),
  notifications: [],
}
jest.mock('../components/NotificationsRoot/hook', () =>
  jest.fn(() => mockedNotificationsRootHook)
)

const mockedHeaderHook: HeaderHookReturn = {
  account: null,
  handleLogin: jest.fn(),
  handleLogout: jest.fn(),
  sessionId: null,
}
jest.mock('../layouts/Default/Header/hook', () =>
  jest.fn(() => mockedHeaderHook)
)

const mockedLoginHook: LoginHookReturn = {
  handleLogin: jest.fn(),
  isSubmitting: false,
}
jest.mock('../pages/Login/hook', () => jest.fn(() => mockedLoginHook))

const mockedDashboardHook: DashboardHookReturn = {
  query: '',
}
jest.mock('../pages/Dashboard/hook', () => jest.fn(() => mockedDashboardHook))

const mockedTrendingHook: TrendingHookReturn = {
  error: null,
  handlePagination: () => jest.fn(),
  isLoading: false,
  movies: undefined,
}
jest.mock('../components/Dashboard/Trending/hook', () =>
  jest.fn(() => mockedTrendingHook)
)

const mockedListsHook: ListsHookReturn = {
  error: null,
  handleCreateList: jest.fn(),
  handleOpenCreateListModal: jest.fn(),
  handlePagination: jest.fn(),
  isLoading: false,
  lists: undefined,
}
jest.mock('../pages/Lists/hook', () => jest.fn(() => mockedListsHook))

const mockedWatchlistHook: WatchlistHookReturn = {
  error: null,
  handleConfirmDeleteMovie: jest.fn(),
  handleDeleteMovie: jest.fn(),
  handlePagination: jest.fn(),
  isLoading: false,
  movies: undefined,
}
jest.mock('../pages/Watchlist/hook', () => jest.fn(() => mockedWatchlistHook))

const mockedFavoriteHook: FavoriteHookReturn = {
  error: null,
  handleConfirmDeleteMovie: jest.fn(),
  handleDeleteMovie: jest.fn(),
  handlePagination: jest.fn(),
  isLoading: false,
  movies: undefined,
}
jest.mock('../pages/Favorite/hook', () => jest.fn(() => mockedFavoriteHook))

const mockedListDetailsHook: ListDetailsHookReturn = {
  error: null,
  handleConfirmDeleteList: jest.fn(),
  handleConfirmDeleteMovie: jest.fn(),
  handleDeleteList: jest.fn(),
  handleDeleteMovie: jest.fn(),
  handlePagination: jest.fn(),
  isLoading: false,
  list: mockListDetails,
}
jest.mock('../pages/ListDetails/hook', () =>
  jest.fn(() => mockedListDetailsHook)
)

const mockedMovieDetailsHook: MovieDetailsHookReturn = {
  error: null,
  handleFavoriteClick: jest.fn(),
  handleGoToCast: jest.fn(),
  handlePopoverMouseEnter: jest.fn(),
  handleWatchlistClick: jest.fn(),
  isLoading: false,
  movie: mockMovieDetailsExtended,
  popoverOpen: false,
  sessionId: 'test/session_id',
  setPopoverOpen: jest.fn(),
}
jest.mock('../pages/MovieDetails/hook', () =>
  jest.fn(() => mockedMovieDetailsHook)
)

const mockedCastHook: CastHookReturn = {
  error: null,
  isLoading: false,
  movie: mockMovieDetailsExtended,
  movieSlug: '1234-test-movie',
}
jest.mock('../pages/Cast/hook', () => jest.fn(() => mockedCastHook))

const mockedPersonDetailsHook: PersonDetailsHookReturn = {
  error: null,
  handleGoToCredits: jest.fn(),
  isLoading: false,
  person: mockPersonDetails,
}
jest.mock('../pages/PersonDetails/hook', () =>
  jest.fn(() => mockedPersonDetailsHook)
)

const mockedCreditsHook: CreditsHookReturn = {
  dataSource: mockedCredits,
  error: null,
  handleChangeFilter: jest.fn(),
  isLoading: false,
  person: mockPersonDetails,
  personSlug: '1234-test-person',
}
jest.mock('../pages/Credits/hook', () => jest.fn(() => mockedCreditsHook))

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
    expect(
      await screen.findByText(/sign in/i, undefined, { timeout: 3000 })
    ).toBeInTheDocument()
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
  it('should render ListDetails', async () => {
    renderWithWrapper(<ListDetails />)
    expect(await screen.findByText(/title/i)).toBeInTheDocument()
  })
  it('should render MovieDetails', async () => {
    renderWithWrapper(<MovieDetails />)
    expect(
      await screen.findByText(/title/i, undefined, { timeout: 3000 })
    ).toBeInTheDocument()
  })
  it('should render Cast', async () => {
    renderWithWrapper(<Cast />)
    expect(
      await screen.findByText(/back to movie details/i, undefined, {
        timeout: 3000,
      })
    ).toBeInTheDocument()
  })
  it('should render PersonDetails', async () => {
    renderWithWrapper(<PersonDetails />)
    expect(
      await screen.findByText(/personal info/i, undefined, { timeout: 3000 })
    ).toBeInTheDocument()
  })
  it('should render Credits', async () => {
    renderWithWrapper(<Credits />)
    expect(
      await screen.findByText(/back to person details/i, undefined, {
        timeout: 3000,
      })
    ).toBeInTheDocument()
  })
  it('should render NotFound', async () => {
    renderWithWrapper(<NotFound />)
    expect(await screen.findByText(/oops!/i)).toBeInTheDocument()
  })
})
