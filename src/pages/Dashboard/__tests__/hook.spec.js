import { useNavigate } from 'react-router-dom'
import { renderHook } from '@testing-library/react-hooks'

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
})
