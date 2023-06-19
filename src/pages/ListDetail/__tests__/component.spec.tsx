import { render } from '@testing-library/react'
import { mockListDetail } from 'src/__mocks__/mockList'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import type { ListDetailHook } from '../types'

import ListDetails from '../component'

const mockedHookData: ListDetailHook = {
  error: null,
  handleListDelete: jest.fn(),
  handleMovieDelete: jest.fn(),
  list: mockListDetail,
  loading: false
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
