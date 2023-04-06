import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))
const navigate = jest.fn()
useNavigate.mockReturnValue(navigate)

describe('MovieItem useContainer hook', () => {
  let result = null
  const props = {
    movieId: 123
  }

  beforeEach(() => {
    ;({ result } = renderHook(() => useContainer(props)))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleClick` method', () => {
    act(() => {
      result.current.handleClick()
    })

    expect(navigate).toHaveBeenCalledWith('/movie/123')
  })
})
