import { renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { fetchAccount } from 'src/store/session/actions'
import { sessionIdSelector } from 'src/store/session/selectors'
import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'test/sessionId')
}))

describe('ProtectedRoutes useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `useEffect` method with sessionId', () => {
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(fetchAccount())
  })

  it('checks `useEffect` method with undefined sessionId', () => {
    sessionIdSelector.mockReturnValueOnce(null)
    ;({ result } = renderHook(useContainer))

    expect(dispatch).not.toHaveBeenCalled()
  })
})
