import { render } from '@testing-library/react'

import type { ListDetailHook } from '../types'
import { mockListDetail } from 'src/__mocks__/mockList'
import Wrapper from 'src/utils/testHelpers/wrapperMock'
import ListDetails from '../component'

const mockedHookData: ListDetailHook = {
  list: mockListDetail,
  loading: false,
  error: null,
  handleListDelete: jest.fn(),
  handleMovieDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ListDetail component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with empty list', () => {
    mockedHookData.list = null
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
    mockedHookData.error = 'Something went wrong!'
    const { asFragment } = render(<ListDetails />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
