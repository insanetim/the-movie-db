import { render } from '@testing-library/react'

import Wrapper from 'src/__mocks__/wrapperMock'
import ListDetails from '../component'

const mockedHookData = {
  list: {
    name: 'Test list',
    items: []
  },
  loading: false,
  error: null,
  handleListDelete: jest.fn(),
  handleMovieDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ListDetail component', () => {
  afterAll(() => {
    jest.unmock('../hook')
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = { message: 'test/error' }
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
