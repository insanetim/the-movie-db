import { act, renderHook } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import getSlug from 'src/utils/helpers/getSlug'

import useContainer from '../hook'
import { MovieItemHookProps } from '../types'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

jest.mock('src/utils/helpers/getSlug')

const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>
const mockGetSlug = getSlug as jest.MockedFunction<typeof getSlug>

describe('MovieItem useContainer hook', () => {
  const navigate = jest.fn()
  const defaultProps: MovieItemHookProps = {
    id: 123,
    title: 'Test Movie',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseNavigate.mockReturnValue(navigate)
    mockGetSlug.mockImplementation((id, title) => `mocked-slug-${id}-${title}`)
  })

  it('should initialize hook with correct default values', () => {
    const { result } = renderHook(() => useContainer(defaultProps))

    expect(result.current).toHaveProperty('handleNavigateToMovie')
    expect(typeof result.current.handleNavigateToMovie).toBe('function')
  })

  describe('handleNavigateToMovie', () => {
    it('should call navigate with correct URL when handleNavigateToMovie is called', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      act(() => {
        result.current.handleNavigateToMovie()
      })

      expect(mockGetSlug).toHaveBeenCalledWith(
        defaultProps.id,
        defaultProps.title
      )
      expect(navigate).toHaveBeenCalledWith('/movie/mocked-slug-123-Test Movie')
    })

    it('should handle different movie IDs and titles', () => {
      const testCases = [
        { id: 1, title: 'Movie One' },
        { id: 999, title: 'Another Movie' },
        { id: 42, title: 'The Answer' },
      ]

      testCases.forEach(({ id, title }) => {
        const { result } = renderHook(() => useContainer({ id, title }))

        act(() => {
          result.current.handleNavigateToMovie()
        })

        expect(mockGetSlug).toHaveBeenCalledWith(id, title)
        expect(navigate).toHaveBeenCalledWith(
          `/movie/mocked-slug-${id}-${title}`
        )

        // Reset mocks for the next test case
        jest.clearAllMocks()
      })
    })
  })
})
