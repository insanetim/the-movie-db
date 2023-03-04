import { renderHook } from '@testing-library/react-hooks'

import useContainer from '../hook'

describe('Dashboard useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })
})
