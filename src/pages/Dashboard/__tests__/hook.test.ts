import { renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}))

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>

describe('Dashboard useContainer hook', () => {
  let mockGet: jest.Mock

  beforeEach(() => {
    mockGet = jest.fn()
    // return tuple [searchParams, setSearchParams]
    mockUseSearchParams.mockReturnValue([
      { get: mockGet } as never,
      jest.fn(),
    ] as never)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return query from search params when present', () => {
    mockGet.mockReturnValue('matrix')

    const { result } = renderHook(() => useContainer())

    expect(result.current.query).toBe('matrix')
    expect(mockGet).toHaveBeenCalledWith('search')
  })

  it('should return empty string when search param is absent', () => {
    mockGet.mockReturnValue(null)

    const { result } = renderHook(() => useContainer())

    expect(result.current.query).toBe('')
  })

  it('should handle different search values', () => {
    mockGet.mockReturnValue('star wars')
    expect(renderHook(() => useContainer()).result.current.query).toBe(
      'star wars'
    )

    mockGet.mockReturnValue('')
    expect(renderHook(() => useContainer()).result.current.query).toBe('')
  })
})
