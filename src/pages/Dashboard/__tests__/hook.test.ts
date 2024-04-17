import { renderHook } from '@testing-library/react'
import { WrapperComponent } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

describe('Dashboard useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHook(() => useContainer(), {
      wrapper: WrapperComponent,
    })

    expect(result.current).toMatchSnapshot()
  })
})
