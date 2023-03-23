import { renderHook } from '@testing-library/react'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({}))
}))

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
