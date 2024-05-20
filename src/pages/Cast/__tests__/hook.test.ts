import { renderHook } from '@testing-library/react'
import { mockMovieDetailsExtended } from 'src/__mocks__/mockMovie'
import { dispatch } from 'src/__mocks__/react-redux'
import * as movieDetailsActions from 'src/store/movieDetails/actions'
import * as movieDetailsSelectors from 'src/store/movieDetails/selectors'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ movieSlug: '1234-test-movie' })),
}))

jest.mock('src/store/movieDetails/selectors')

describe('Cast useContainer hook', () => {
  jest
    .spyOn(movieDetailsSelectors, 'movieDetailsLoadingSelector')
    .mockReturnValue(false)
  jest
    .spyOn(movieDetailsSelectors, 'movieDetailsErrorSelector')
    .mockReturnValue(null)
  const selectMovieById = jest
    .spyOn(movieDetailsSelectors, 'movieDetailsSelector')
    .mockReturnValue(mockMovieDetailsExtended)

  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "useEffect" method', () => {
    const fetchMovieDetails = jest.spyOn(
      movieDetailsActions,
      'fetchMovieDetails'
    )
    selectMovieById.mockReturnValueOnce(undefined as never)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalled()
    expect(fetchMovieDetails).toHaveBeenCalledWith(1234)
  })
})
