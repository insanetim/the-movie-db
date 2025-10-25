import { screen } from '@testing-library/react'
import mockAccount from 'src/__mocks__/mockAccount'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import DefaultLayout from '../component'
import { HeaderHookReturn } from '../Header/types'

const mockedHeader: HeaderHookReturn = {
  account: mockAccount,
  handleLogin: jest.fn(),
  handleLogout: jest.fn(),
  sessionId: 'test/session_id',
}
jest.mock('../Header/hook', () => jest.fn(() => mockedHeader))

describe('DefaultLayout component', () => {
  it('should render header, outlet wrapper, and footer', () => {
    renderWithWrapper(<DefaultLayout />)

    expect(screen.getByText(/insanetim/i)).toBeInTheDocument()
    expect(document.querySelector('.ant-layout-content')).not.toBeNull()
    expect(document.querySelector('.ant-layout-footer')).not.toBeNull()
  })
})
