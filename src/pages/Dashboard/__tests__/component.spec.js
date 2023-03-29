import { render } from '@testing-library/react'

import Dashboard from '../component'
import Wrapper from '../../../__mocks__/wrapperMock'

const mockedHookData = {
  searchQuery: null
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Dashboard component', () => {
  afterAll(() => {
    jest.unmock('../hook')
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<Dashboard />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with searchQuery', () => {
    mockedHookData.searchQuery = 'test/searchQuery'
    const { asFragment } = render(<Dashboard />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
