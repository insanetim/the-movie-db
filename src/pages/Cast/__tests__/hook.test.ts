import { renderHook } from '@testing-library/react'
import { useParams } from 'react-router-dom'
import { mockMovieDetailExtended } from 'src/__mocks__/mockMovie'
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
    .mockReturnValue(mockMovieDetailExtended)

  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot without params', () => {
    jest.mocked(useParams).mockReturnValueOnce({})
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "useEffect" method', () => {
    const fetchMovieDetail = jest.spyOn(
      movieDetailsActions,
      'fetchMovieDetails'
    )
    selectMovieById.mockReturnValueOnce(undefined as never)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalled()
    expect(fetchMovieDetail).toHaveBeenCalledWith(1234)
  })
})
