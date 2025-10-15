import { act } from '@testing-library/react'
import * as appSlice from 'src/store/features/app'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('ThemeSwitch useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useContainer())

    expect(result.current).toMatchSnapshot()
  })

  it('should dispatch setTheme on handleChange', () => {
    const { result } = renderHookWithWrapper(() => useContainer())

    act(() => {
      result.current.handleChange('dark')
    })

    expect(mockDispatch).toHaveBeenCalledWith(appSlice.setTheme('dark'))
  })
})
