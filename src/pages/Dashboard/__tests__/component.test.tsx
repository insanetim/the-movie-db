import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Dashboard from '../component'
import { DashboardHookReturn } from '../types'

const mockedHook: DashboardHookReturn = { query: '' }
jest.mock('../hook', () => jest.fn(() => mockedHook))
jest.mock(
  'src/components/Dashboard/SearchInput',
  () =>
    ({ query }: { query: string }) => (
      <div data-testid='search-input'>{query}</div>
    )
)
jest.mock(
  'src/components/Dashboard/SearchResult/component',
  () =>
    ({ query }: { query: string }) => (
      <div
        data-query={query}
        data-testid='search-result'
      >
        Search Result
      </div>
    )
)
jest.mock('src/components/Dashboard/Trending/component', () => () => (
  <div data-testid='trending'>Trending</div>
))

describe('Dashboard component', () => {
  beforeEach(() => {
    mockedHook.query = ''
  })

  it('should render search input and trending when query is empty', () => {
    renderWithWrapper(<Dashboard />)

    expect(screen.getByTestId('search-input')).toHaveTextContent('')
    expect(screen.getByTestId('trending')).toBeInTheDocument()
    expect(screen.queryByTestId('search-result')).not.toBeInTheDocument()
  })

  it('should render search result when query provided', () => {
    mockedHook.query = 'test/search'

    renderWithWrapper(<Dashboard />)

    expect(screen.getByTestId('search-input')).toHaveTextContent('test/search')
    expect(screen.getByTestId('search-result')).toHaveAttribute(
      'data-query',
      'test/search'
    )
    expect(screen.queryByTestId('trending')).not.toBeInTheDocument()
  })
})
