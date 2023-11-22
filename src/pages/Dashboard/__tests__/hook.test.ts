import { renderHook } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import useContainer from '../hook'

describe('Dashboard useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHook(() => useContainer(), { wrapper: Wrapper })

    expect(result.current).toMatchSnapshot()
  })
})
