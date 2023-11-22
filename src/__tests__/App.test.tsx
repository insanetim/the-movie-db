import { render } from '@testing-library/react'
import { ReactNode, Suspense } from 'react'
import { Location } from 'react-router-dom'
import { mockListDetail } from 'src/__mocks__/mockList'
import { mockMovieDetail } from 'src/__mocks__/mockMovie'
import App, {
  Dashboard,
  DefaultLayout,
  Favorite,
  ListDetail,
  Lists,
  Login,
  MovieDetail,
  NotFound,
  Watchlist
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
import Wrapper from 'src/utils/testHelpers/wrapperMock'

const mockedProtectedRoutesHook: ProtectedRoutesHook = {
  location: {} as Location,
  sessionId: ''
}
jest.mock('../components/ProtectedRoutes/hook', () =>
  jest.fn(() => mockedProtectedRoutesHook)
)

const mockedModalRootHook: ModalRootHook = {
  modalProps: null,
  modalType: null,
  onCancel: jest.fn()
}
jest.mock('../components/ModalRoot/hook', () =>
  jest.fn(() => mockedModalRootHook)
)

const mockedNotificationsRootHook: NotificationsRootHook = {
  hideNotification: jest.fn(),
  notifications: []
}
jest.mock('../components/NotificationsRoot/hook', () =>
  jest.fn(() => mockedNotificationsRootHook)
)

const mockedHeaderHook: HeaderHook = {
  account: null,
  handleLogOut: jest.fn()
}
jest.mock('../layouts/Default/Header/hook', () =>
  jest.fn(() => mockedHeaderHook)
)

const mockedLoginHook: LoginHook = {
  handleLogIn: jest.fn(),
  loading: false
}
jest.mock('../pages/Login/hook', () => jest.fn(() => mockedLoginHook))

const mockedDashboardHook: DashboardHook = {
  query: ''
}
jest.mock('../pages/Dashboard/hook', () => jest.fn(() => mockedDashboardHook))

const mockedTrendingHook: TrendingHook = {
  error: null,
  handlePagination: () => jest.fn(),
  loading: false,
  movies: null
}
jest.mock('../components/Dashboard/Trending/hook', () =>
  jest.fn(() => mockedTrendingHook)
)

const mockedListsHook: ListsHook = {
  error: null,
  handleCreateList: jest.fn(),
  handlePagination: jest.fn(),
  lists: null,
  loading: false
}
jest.mock('../pages/Lists/hook', () => jest.fn(() => mockedListsHook))

const mockedWatchlistHook: WatchlistHook = {
  error: null,
  handleMovieDelete: jest.fn(),
  handlePagination: jest.fn(),
  loading: false,
  movies: null
}
jest.mock('../pages/Watchlist/hook', () => jest.fn(() => mockedWatchlistHook))

const mockedFavoriteHook: FavoriteHook = {
  error: null,
  handleMovieDelete: jest.fn(),
  handlePagination: jest.fn(),
  loading: false,
  movies: null
}
jest.mock('../pages/Favorite/hook', () => jest.fn(() => mockedFavoriteHook))

const mockedListDetailHook: ListDetailHook = {
  error: null,
  handleListDelete: jest.fn(),
  handleMovieDelete: jest.fn(),
  handlePagination: jest.fn(),
  list: mockListDetail,
  loading: false
}
jest.mock('../pages/ListDetail/hook', () => jest.fn(() => mockedListDetailHook))

const mockedMovieDetailHook: MovieDetailHook = {
  error: null,
  handleFavoriteClick: jest.fn(),
  handleWatchlistClick: jest.fn(),
  loading: false,
  movie: mockMovieDetail,
  popoverOpen: false,
  setPopoverOpen: jest.fn()
}
jest.mock('../pages/MovieDetail/hook', () =>
  jest.fn(() => mockedMovieDetailHook)
)

describe('App component', () => {
  const WrapperWithSuspense = ({ children }: { children: ReactNode }) => (
    <Suspense fallback={null}>
      <Wrapper>{children}</Wrapper>
    </Suspense>
  )

  it('should match snapshot', () => {
    const { asFragment } = render(<App />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render DefaultLayout', async () => {
    const { findByText } = render(<DefaultLayout />, {
      wrapper: WrapperWithSuspense
    })

    expect(
      await findByText('insanetim', { exact: false }, { timeout: 3000 })
    ).toBeInTheDocument()
  })

  it('should render Login', async () => {
    const { findByText } = render(<Login />, { wrapper: WrapperWithSuspense })

    expect(await findByText('Log in')).toBeInTheDocument()
  })

  it('should render Dashboard', async () => {
    const { findByPlaceholderText } = render(<Dashboard />, {
      wrapper: WrapperWithSuspense
    })

    expect(
      await findByPlaceholderText(
        'Enter movie name',
        { exact: false },
        { timeout: 3000 }
      )
    ).toBeInTheDocument()
  })

  it('should render Lists', async () => {
    const { findByText } = render(<Lists />, { wrapper: WrapperWithSuspense })

    expect(
      await findByText('My Lists', { exact: false }, { timeout: 3000 })
    ).toBeInTheDocument()
  })

  it('should render Watchlist', async () => {
    const { findByText } = render(<Watchlist />, {
      wrapper: WrapperWithSuspense
    })

    expect(await findByText('Watchlist')).toBeInTheDocument()
  })

  it('should render Favorite', async () => {
    const { findByText } = render(<Favorite />, {
      wrapper: WrapperWithSuspense
    })

    expect(await findByText('Favorite')).toBeInTheDocument()
  })

  it('should render ListDetail', async () => {
    const { findByText } = render(<ListDetail />, {
      wrapper: WrapperWithSuspense
    })

    expect(await findByText('test/title')).toBeInTheDocument()
  })

  it('should render MovieDetail', async () => {
    const { findByText } = render(<MovieDetail />, {
      wrapper: WrapperWithSuspense
    })

    expect(
      await findByText('test/title', { exact: false }, { timeout: 3000 })
    ).toBeInTheDocument()
  })

  it('should render NotFound', async () => {
    const { findByText } = render(<NotFound />, {
      wrapper: WrapperWithSuspense
    })

    expect(await findByText('Oops!', { exact: false })).toBeInTheDocument()
  })
})
