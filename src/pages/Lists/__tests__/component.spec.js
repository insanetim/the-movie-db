import { render } from '@testing-library/react'

import Lists from '../component'
import Wrapper from '../../../__mocks__/wrapperMock'

const mockedHookData = {
  lists: {
    results: [
      {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      }
    ]
  },
  loading: false,
  error: null,
  handleClick: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Lists component', () => {
  afterAll(() => {
    jest.unmock('../hook')
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<Lists />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with loading', () => {
    mockedHookData.loading = true
    const { asFragment } = render(<Lists />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with error', () => {
    mockedHookData.loading = false
    mockedHookData.error = { message: 'test/error' }
    const { asFragment } = render(<Lists />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
