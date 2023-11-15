import type { Location } from 'react-router-dom'
import type { TrendingHook } from 'src/components/Dashboard/Trending/types'
import type { ModalRootHook } from 'src/components/ModalRoot/types'
import type { NotificationsRootHook } from 'src/components/NotificationsRoot/types'
import type { ProtectedRoutesHook } from 'src/components/ProtectedRoutes/types'
import type { DashboardHook } from 'src/pages/Dashboard/types'
import type { FavoriteHook } from 'src/pages/Favorite/types'
import type { ListDetailHook } from 'src/pages/ListDetail/types'
import type { ListsHook } from 'src/pages/Lists/types'
import type { LoginHook } from 'src/pages/Login/types'
import type { MovieDetailHook } from 'src/pages/MovieDetail/types'
import type { WatchlistHook } from 'src/pages/Watchlist/types'

import { render } from '@testing-library/react'
import { ReactNode, Suspense } from 'react'
import { mockListDetail } from 'src/__mocks__/mockList'
import { mockMovieDetail } from 'src/__mocks__/mockMovie'
import App, {
  Dashboard,
  Favorite,
  Layout,
  ListDetail,
  Lists,
  Login,
  MovieDetail,
  NotFound,
  Watchlist
} from 'src/App'
import { HeaderHook } from 'src/components/Layout/Header/types'
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
jest.mock('../components/Layout/Header/hook', () =>
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

  it('matches snapshot', () => {
    const { asFragment } = render(<App />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Layout', async () => {
    const { findByText } = render(<Layout />, { wrapper: WrapperWithSuspense })

    expect(
      await findByText('insanetim', { exact: false }, { timeout: 3000 })
    ).toBeInTheDocument()
  })

  it('renders Login', async () => {
    const { findByText } = render(<Login />, { wrapper: WrapperWithSuspense })

    expect(await findByText('Log in')).toBeInTheDocument()
  })

  it('renders Dashboard', async () => {
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

  it('renders Lists', async () => {
    const { findByText } = render(<Lists />, { wrapper: WrapperWithSuspense })

    expect(
      await findByText('My Lists', { exact: false }, { timeout: 3000 })
    ).toBeInTheDocument()
  })

  it('renders Watchlist', async () => {
    const { findByText } = render(<Watchlist />, {
      wrapper: WrapperWithSuspense
    })

    expect(await findByText('Watchlist')).toBeInTheDocument()
  })

  it('renders Favorite', async () => {
    const { findByText } = render(<Favorite />, {
      wrapper: WrapperWithSuspense
    })

    expect(await findByText('Favorite')).toBeInTheDocument()
  })

  it('renders ListDetail', async () => {
    const { findByText } = render(<ListDetail />, {
      wrapper: WrapperWithSuspense
    })

    expect(await findByText('test/title')).toBeInTheDocument()
  })

  it('renders MovieDetail', async () => {
    const { findByText } = render(<MovieDetail />, {
      wrapper: WrapperWithSuspense
    })

    expect(
      await findByText('test/title', { exact: false }, { timeout: 3000 })
    ).toBeInTheDocument()
  })

  it('renders NotFound', async () => {
    const { findByText } = render(<NotFound />, {
      wrapper: WrapperWithSuspense
    })

    expect(await findByText('Oops!', { exact: false })).toBeInTheDocument()
  })
})
