import Cookies from 'js-cookie'

import getSessionId from '../getSessionId'

describe('getSessionId', () => {
  const cookiesSpy = jest.spyOn(Cookies, 'get')

  it('should return correct value', () => {
    cookiesSpy.mockReturnValueOnce('test/session_id' as never)

    expect(getSessionId()).toBe('test/session_id')
  })

  it('should return correct value', () => {
    cookiesSpy.mockReturnValueOnce(undefined as never)

    expect(getSessionId()).toBe('')
  })
})
