import { useNavigate } from 'react-router-dom'
import { renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { searchQuerySelector } from 'src/state/dashboard/selectors'
import { setSearchQuery } from 'src/state/dashboard/actions'
import useContainer from '../hook'

jest.mock('src/state/dashboard/selectors', () => ({
  searchQuerySelector: jest.fn(() => null)
}))

describe('Dashboard useContainer hook', () => {
  let result = null

  const navigate = jest.fn()
  useNavigate.mockReturnValue(navigate)

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `useEffect` method with searchQuery', () => {
    searchQuerySelector.mockReturnValueOnce('test/search')
    ;({ result } = renderHook(useContainer))

    expect(navigate).toHaveBeenCalledWith({ search: 'search=test/search' })
  })

  it('checks `useEffect` method without searchQuery', () => {
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledWith(setSearchQuery(null))
  })
})
