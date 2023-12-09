import { act, renderHook } from '@testing-library/react'
import mockNotification from 'src/__mocks__/mockNotification'
import { dispatch } from 'src/__mocks__/react-redux'
import { hideNotification } from 'src/store/app/actions'

import useContainer from '../hook'

jest.mock('src/store/app/selectors', () => ({
  notificationsSelector: () => [mockNotification],
}))

describe('NotificationsRoot useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "hideNotification" method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.hideNotification('test/id')
    })

    expect(dispatch).toHaveBeenCalledWith(hideNotification('test/id'))
  })
})
