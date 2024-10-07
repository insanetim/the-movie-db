import { mockMovieDetailsExtended } from 'src/__mocks__/mockMovie'
import * as reactRedux from 'src/store/hooks'
import * as movieDetailsActions from 'src/store/movieDetails/actions'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ movieSlug: '1234-test-movie' })),
}))

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('Cast useContainer hook', () => {
  const mockState = {
    movieDetails: {
      entities: {
        [mockMovieDetailsExtended.id]: mockMovieDetailsExtended,
      },
      error: null,
      ids: [mockMovieDetailsExtended.id],
      loading: false,
    },
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(result.current).toMatchSnapshot()
  })

  it('should check "useEffect" method', () => {
    const mockState = {
      movieDetails: {
        entities: {},
        error: null,
        ids: [],
        loading: false,
      },
    }
    const fetchMovieDetails = jest.spyOn(
      movieDetailsActions,
      'fetchMovieDetails'
    )

    renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchMovieDetails).toHaveBeenCalledWith(1234)
  })
})
