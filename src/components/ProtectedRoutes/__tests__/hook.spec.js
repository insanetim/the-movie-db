import Cookies from 'js-cookie'
import { renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { fetchAccount, setSession } from 'src/state/session/actions'
import useContainer from '../hook'

jest.spyOn(Cookies, 'get').mockReturnValue('12345')

describe('ProtectedRoutes useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `useEffect` method with session_id', () => {
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledWith(setSession('12345'))
    expect(dispatch).toHaveBeenCalledWith(fetchAccount())
    expect(dispatch.mock.calls.length).toBe(2)
  })

  it('checks `useEffect` method with undefined session_id', () => {
    Cookies.get.mockReturnValue(undefined)
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledWith(setSession(null))
    expect(dispatch.mock.calls.length).toBe(1)
  })
})
