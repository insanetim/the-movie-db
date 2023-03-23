import { render } from '@testing-library/react'

import DashboardSearchInput from '../component'

const mockedHookData = {
  currentValue: 'test/searchQuery',
  handleChange: jest.fn(),
  handleSearch: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('DashboardSearchInput component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<DashboardSearchInput />)

    expect(asFragment()).toMatchSnapshot()
  })
})
