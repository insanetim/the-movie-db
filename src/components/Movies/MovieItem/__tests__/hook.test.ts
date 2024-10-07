import { act } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'
import { MovieItemHookProps } from '../types'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

describe('MovieItem useContainer hook', () => {
  const props: MovieItemHookProps = { id: 1234, title: 'movie' }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleClick" method', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    act(() => {
      result.current.handleClick()
    })

    expect(navigate).toHaveBeenCalledWith('/movie/1234-movie')
  })
})
