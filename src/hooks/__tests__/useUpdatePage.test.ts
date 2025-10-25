import { act, renderHook } from '@testing-library/react'
import getParams from 'src/utils/helpers/getParams'

import useUpdatePage from '../useUpdatePage'

jest.mock('src/utils/helpers/getParams')

const mockGetParams = getParams as jest.MockedFunction<typeof getParams>

describe('useUpdatePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should decrement page when there is exactly 1 item and page > 1', () => {
    const setSearchParams = jest.fn()
    const items = [{}]
    const page = '3'
    const expectedParams: ReturnType<typeof getParams> = { page: '2' }
    mockGetParams.mockReturnValue(expectedParams)

    const { result } = renderHook(() =>
      useUpdatePage({ items, page, setSearchParams })
    )

    act(() => {
      result.current.updatePage()
    })

    expect(mockGetParams).toHaveBeenCalledWith({ page: 2 })
    expect(setSearchParams).toHaveBeenCalledWith(expectedParams)
  })

  it('should not change page when items length is not 1', () => {
    const setSearchParams = jest.fn()
    const items = [{}, {}]
    const page = '5'

    const { result } = renderHook(() =>
      useUpdatePage({ items, page, setSearchParams })
    )

    act(() => {
      result.current.updatePage()
    })

    expect(setSearchParams).not.toHaveBeenCalled()
    expect(mockGetParams).not.toHaveBeenCalled()
  })

  it('should not change page when current page is 1', () => {
    const setSearchParams = jest.fn()
    const items = [{}]
    const page = '1'

    const { result } = renderHook(() =>
      useUpdatePage({ items, page, setSearchParams })
    )

    act(() => {
      result.current.updatePage()
    })

    expect(setSearchParams).not.toHaveBeenCalled()
    expect(mockGetParams).not.toHaveBeenCalled()
  })

  it('should not change page when page is not a valid number', () => {
    const setSearchParams = jest.fn()
    const items = [{}]
    const page = 'abc'

    const { result } = renderHook(() =>
      useUpdatePage({ items, page, setSearchParams })
    )

    act(() => {
      result.current.updatePage()
    })

    expect(setSearchParams).not.toHaveBeenCalled()
    expect(mockGetParams).not.toHaveBeenCalled()
  })

  it('should call getParams with page 1 but not persist it in params', () => {
    const setSearchParams = jest.fn()
    const items = [{}]
    const page = '2'
    const expectedParams: ReturnType<typeof getParams> = {}
    mockGetParams.mockReturnValue(expectedParams)

    const { result } = renderHook(() =>
      useUpdatePage({ items, page, setSearchParams })
    )

    act(() => {
      result.current.updatePage()
    })

    expect(mockGetParams).toHaveBeenCalledWith({ page: 1 })
    expect(setSearchParams).toHaveBeenCalledWith(expectedParams)
  })

  it('should handle undefined items by treating them as empty array', () => {
    const setSearchParams = jest.fn()
    const page = '5'

    const { result } = renderHook(() =>
      useUpdatePage({ page, setSearchParams })
    )

    act(() => {
      result.current.updatePage()
    })

    expect(setSearchParams).not.toHaveBeenCalled()
    expect(mockGetParams).not.toHaveBeenCalled()
  })
})
