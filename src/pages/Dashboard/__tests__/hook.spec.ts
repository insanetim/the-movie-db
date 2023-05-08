import { renderHook } from '@testing-library/react'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({}))
}))

describe('Dashboard useContainer hook', () => {
  it('matches snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })
})
