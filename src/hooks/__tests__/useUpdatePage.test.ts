import { act } from '@testing-library/react'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useUpdatePage, { UseUpdatePageProps } from '../useUpdatePage'

describe('useUpdatePage', () => {
  const mockDispatch = jest.fn()
  jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)
  const action = jest.fn()
  const setSearchParams = jest.fn()

  const props: UseUpdatePageProps = {
    action,
    items: [1],
    page: '3',
    setSearchParams,
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useUpdatePage(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "updatePage" method', () => {
    const { result } = renderHookWithWrapper(() => useUpdatePage(props))

    act(() => {
      result.current.updatePage()
    })

    expect(setSearchParams).toHaveBeenCalledWith({ page: '2' })
  })

  it('should check "updatePage" method without items', () => {
    const extendedProps = { ...props, items: undefined }

    const { result } = renderHookWithWrapper(() => useUpdatePage(extendedProps))

    act(() => {
      result.current.updatePage()
    })

    expect(mockDispatch).toHaveBeenCalledWith(action)
  })
})
