import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { logOut } from 'src/store/session/actions'
import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => ({ id: 1 }))
}))

jest.mock('src/store/session/actions')

describe('Header useContainer hook', () => {
  let result = null

  const navigate = jest.fn()
  useNavigate.mockReturnValue(navigate)

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleLogOut` method', async () => {
    dispatch.mockImplementationOnce(() => Promise.resolve())

    await act(async () => {
      await result.current.handleLogOut()
    })

    expect(dispatch).toHaveBeenCalledWith(logOut())
    expect(navigate).toHaveBeenCalledWith('/login', { state: { from: {} } })
  })
})
