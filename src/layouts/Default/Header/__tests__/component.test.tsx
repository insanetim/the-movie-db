import { render } from '@testing-library/react'
import { mergeDeepRight } from 'ramda'
import mockAccount from 'src/__mocks__/mockAccount'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Header from '../component'
import { HeaderHook } from '../types'

const mockedHook: HeaderHook = {
  account: mockAccount,
  handleLogOut: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Header component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Header />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with avatar_path', () => {
    mockedHook.account = mergeDeepRight(mockAccount, {
      avatar: { tmdb: { avatar_path: '/image' } }
    })
    const { asFragment } = render(<Header />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty account', () => {
    mockedHook.account = null
    const { asFragment } = render(<Header />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
