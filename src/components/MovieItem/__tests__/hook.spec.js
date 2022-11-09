import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import useContainer from '../hook'

describe('MovieItem useContainer hook', () => {
  let result = null
  const props = {
    movieId: 1
  }

  const navigate = jest.fn()
  useNavigate.mockReturnValue(navigate)

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

    expect(navigate).toHaveBeenCalledWith('/movie/1')
  })
})
