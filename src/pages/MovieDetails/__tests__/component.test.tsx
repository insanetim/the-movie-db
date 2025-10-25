import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockMovieDetailsExtended } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import MovieDetails from '../component'
import useContainer from '../hook'
import { MovieDetailsHookReturn } from '../types'

jest.mock('src/components/MovieDetails/PopoverContent', () => ({
  __esModule: true,
  default: () => <div data-testid='popoverContent'>Mocked Popover Content</div>,
}))

jest.mock('antd', () => {
  const actual = jest.requireActual('antd')
  const React = jest.requireActual('react')

  return {
    ...actual,
    Popover: ({
      children,
      content,
      onOpenChange,
      open,
      ...rest
    }: {
      [key: string]: unknown
      children: React.ReactElement
      content?: React.ReactNode
      onOpenChange?: (open: boolean) => void
      open?: boolean
    }) => {
      const child = React.cloneElement(children, {
        onClick: (...args: unknown[]) => {
          children.props?.onClick?.(...args)
          onOpenChange?.(!open)
        },
        onMouseEnter: (...args: unknown[]) => {
          children.props?.onMouseEnter?.(...args)
        },
      })

      return (
        <div
          data-open={open}
          data-testid='popoverMock'
          {...rest}
        >
          {child}
          {open && content}
        </div>
      )
    },
  }
})

const defaultMovie = mockMovieDetailsExtended
const cloneMovie = () =>
  JSON.parse(JSON.stringify(defaultMovie)) as NonNullable<
    MovieDetailsHookReturn['movie']
  >

const mockedHook: MovieDetailsHookReturn = {
  error: null,
  handleFavoriteClick: jest.fn(),
  handleGoToCast: jest.fn(),
  handlePopoverMouseEnter: jest.fn(),
  handleWatchlistClick: jest.fn(),
  isLoading: false,
  movie: cloneMovie(),
  popoverOpen: false,
  sessionId: 'test/session_id',
  setPopoverOpen: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('MovieDetails component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.error = null
    mockedHook.isLoading = false
    mockedHook.movie = cloneMovie()
    mockedHook.popoverOpen = false
    mockedHook.sessionId = 'test/session_id'
    jest.mocked(useContainer).mockImplementation(() => mockedHook)
  })

  it('should render movie details with actions and overview', () => {
    renderWithWrapper(<MovieDetails />)

    expect(
      screen.getByText(content => content.startsWith(defaultMovie.title))
    ).toBeInTheDocument()
    expect(screen.getByText(defaultMovie.overview ?? '')).toBeInTheDocument()
    expect(screen.getByTestId('addMovieToListPopover')).toBeInTheDocument()
    expect(screen.getByTestId('addToFavoriteBtn')).toBeInTheDocument()
    expect(screen.getByTestId('addToWatchlistBtn')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Full Cast & Crew' })
    ).toBeInTheDocument()
  })

  it('should call "handlePopoverMouseEnter" when popover hovered', async () => {
    renderWithWrapper(<MovieDetails />)

    const popover = screen.getByTestId('addMovieToListPopover')
    await user.hover(popover)

    expect(mockedHook.handlePopoverMouseEnter).toHaveBeenCalled()
  })

  it('should call "setPopoverOpen" when popover clicked', async () => {
    renderWithWrapper(<MovieDetails />)

    const popover = screen.getByTestId('addMovieToListPopover')
    await user.click(popover)

    expect(mockedHook.setPopoverOpen).toHaveBeenCalled()
  })

  it('should call "handleFavoriteClick" when button clicked', async () => {
    renderWithWrapper(<MovieDetails />)

    const button = screen.getByTestId('addToFavoriteBtn')
    await user.click(button)

    expect(mockedHook.handleFavoriteClick).toHaveBeenCalled()
  })

  it('should call "handleWatchlistClick" when button clicked', async () => {
    renderWithWrapper(<MovieDetails />)

    const button = screen.getByTestId('addToWatchlistBtn')
    await user.click(button)

    expect(mockedHook.handleWatchlistClick).toHaveBeenCalled()
  })

  it('should call "handleGoToCast" when button clicked', async () => {
    renderWithWrapper(<MovieDetails />)

    const button = screen.getByText('Full Cast & Crew')
    await user.click(button)

    expect(mockedHook.handleGoToCast).toHaveBeenCalled()
  })

  it('should render movie details without release year or cast when unavailable', () => {
    const customMovie = cloneMovie()
    customMovie.account_states = { favorite: true, watchlist: true }
    customMovie.credits = { cast: [], crew: [] }
    customMovie.release_date = undefined

    jest.mocked(useContainer).mockReturnValueOnce({
      ...mockedHook,
      movie: customMovie,
    })

    renderWithWrapper(<MovieDetails />)

    expect(
      screen.getByRole('heading', { name: defaultMovie.title })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Full Cast & Crew' })
    ).not.toBeInTheDocument()
  })

  it('should render popover content when popover is open', () => {
    const customHook: MovieDetailsHookReturn = {
      ...mockedHook,
      movie: cloneMovie(),
      popoverOpen: true,
    }
    jest.mocked(useContainer).mockImplementation(() => customHook)

    renderWithWrapper(<MovieDetails />)

    expect(screen.getByTestId('popoverMock')).toHaveAttribute(
      'data-open',
      'true'
    )
    expect(screen.getByTestId('popoverContent')).toBeInTheDocument()

    jest.mocked(useContainer).mockImplementation(() => mockedHook)
  })

  it('should render empty state when movie is unavailable', () => {
    mockedHook.movie = undefined

    renderWithWrapper(<MovieDetails />)

    expect(screen.getByText('Movie not found')).toBeInTheDocument()
  })

  it('should render loading state when fetching movie details', () => {
    mockedHook.isLoading = true

    renderWithWrapper(<MovieDetails />)

    expect(document.querySelector('.ant-spin')).toBeInTheDocument()
  })

  it('should render error state when request fails', () => {
    mockedHook.error = 'Something went wrong!'

    renderWithWrapper(<MovieDetails />)

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })
})
