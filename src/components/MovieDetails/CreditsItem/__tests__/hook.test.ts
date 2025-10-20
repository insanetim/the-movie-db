import { act } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'
import { CreditsItemHookProps } from '../types'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

describe('CreditsItem useContainer hook', () => {
  const props: CreditsItemHookProps = {
    id: 1234,
    title: 'John Doe',
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleClick" method', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    act(() => {
      result.current.handleNavigateToPerson()
    })

    expect(navigate).toHaveBeenCalledWith('/person/1234-john-doe')
  })
})
