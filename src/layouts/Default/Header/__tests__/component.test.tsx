import { render } from '@testing-library/react'
import { mergeDeepRight } from 'ramda'
import mockAccount from 'src/__mocks__/mockAccount'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Header from '../component'
import { HeaderHook } from '../types'

const mockedHookData: HeaderHook = {
  account: mockAccount,
  handleLogOut: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Header component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Header />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with avatar_path', () => {
    mockedHookData.account = mergeDeepRight(mockAccount, {
      avatar: { tmdb: { avatar_path: '/image' } }
    })
    const { asFragment } = render(<Header />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty account', () => {
    mockedHookData.account = null
    const { asFragment } = render(<Header />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
