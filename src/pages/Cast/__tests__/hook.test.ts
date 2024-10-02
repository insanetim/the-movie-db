import { mockMovieDetailsExtended } from 'src/__mocks__/mockMovie'
import * as reactRedux from 'src/store/hooks'
import * as movieDetailsActions from 'src/store/movieDetails/actions'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ movieSlug: '1234-test-movie' })),
}))

describe('Cast useContainer hook', () => {
  const mockDispatch = jest.fn()
  jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector')

  it('should match snapshot', () => {
    useSelectorMock
      .mockReturnValueOnce(mockMovieDetailsExtended)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)

    const { result } = renderHookWithWrapper(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "useEffect" method', () => {
    const fetchMovieDetails = jest.spyOn(
      movieDetailsActions,
      'fetchMovieDetails'
    )

    renderHookWithWrapper(useContainer)

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchMovieDetails).toHaveBeenCalledWith(1234)
  })
})
