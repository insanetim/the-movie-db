import { act } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import * as dashboardActions from 'src/store/dashboard/actions'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'
import { SearchResultHookProps } from '../types'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}))
const searchParams = new URLSearchParams({ query: 'test/search' })
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('SearchResult useContainer hook', () => {
  const props: SearchResultHookProps = { query: 'test/search' }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handlePagination" method', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    act(() => {
      result.current.handlePagination(3)
    })

    expect(setSearchParams).toHaveBeenCalledWith({
      page: '3',
      search: props.query,
    })
  })

  it('should check "useEffect" method', () => {
    const fetchSearch = jest.spyOn(dashboardActions, 'fetchSearch')

    renderHookWithWrapper(() => useContainer(props))

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchSearch).toHaveBeenCalledWith({
      page: '1',
      query: props.query,
    })
  })
})
