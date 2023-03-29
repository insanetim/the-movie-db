import { render } from '@testing-library/react'

import ListList from '../component'
import Wrapper from '../../../../__mocks__/wrapperMock'

const mockedHookData = {
  handlePaginationChange: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ListsList component', () => {
  it('matches snapshot', () => {
    const mockedLists = {
      results: [
        {
          id: 1,
          title: 'test/title',
          overview: 'test/overview',
          poster_path: 'test/image'
        }
      ],
      total_pages: 10,
      total_results: 200
    }
    const { asFragment } = render(<ListList lists={mockedLists} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with 1 page', () => {
    const mockedLists = {
      results: [
        {
          id: 1,
          title: 'test/title',
          overview: 'test/overview',
          poster_path: 'test/image'
        }
      ],
      total_pages: 1,
      total_results: 20
    }
    const { asFragment } = render(<ListList lists={mockedLists} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without lists', () => {
    const mockedLists = {
      results: []
    }
    const { asFragment } = render(<ListList lists={mockedLists} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
