import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

describe('MovieItem useContainer hook', () => {
  const props = { movieId: 123 }

  it('matches snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleClick` method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleClick()
    })

    expect(navigate).toHaveBeenCalledWith('/movie/123')
  })
})
