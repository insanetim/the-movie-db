import { act, renderHook } from '@testing-library/react'
import { dispatch } from 'src/__mocks__/react-redux'

import { useUpdatePageProps } from '../useUpdatePage'
import useUpdatePage from '../useUpdatePage'

describe('useUpdatePage', () => {
  const action = jest.fn()
  const setSearchParams = jest.fn()
  const props: useUpdatePageProps = {
    action,
    items: [1],
    page: '3',
    setSearchParams
  }

  it('matches snapshot', () => {
    const { result } = renderHook(() => useUpdatePage(props))

    expect(result.current).toMatchSnapshot()
  })

  it('checks updatePage', () => {
    const { result } = renderHook(() => useUpdatePage(props))

    act(() => {
      result.current.updatePage()
    })

    expect(setSearchParams).toHaveBeenCalledWith({ page: '2' })
  })

  it('checks updatePage withot items', () => {
    const extendedProps = { ...props, items: undefined }
    const { result } = renderHook(() => useUpdatePage(extendedProps))

    act(() => {
      result.current.updatePage()
    })

    expect(dispatch).toHaveBeenCalledWith(action)
  })
})
