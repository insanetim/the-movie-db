import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

describe('Dashboard useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useContainer())

    expect(result.current).toMatchSnapshot()
  })
})
