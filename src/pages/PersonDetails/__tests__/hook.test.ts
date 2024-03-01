import { act, renderHook } from '@testing-library/react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import { dispatch } from 'src/__mocks__/react-redux'
import * as personDetailsActions from 'src/store/personDetails/actions'
import * as personDetailsSelectors from 'src/store/personDetails/selectors'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(() => ({ personSlug: '1234-john-doe' })),
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

jest.mock('src/store/personDetails/selectors')

describe('PersonDetails useContainer hook', () => {
  jest
    .spyOn(personDetailsSelectors, 'personDetailsLoadingSelector')
    .mockReturnValue(false)
  jest
    .spyOn(personDetailsSelectors, 'personDetailsErrorSelector')
    .mockReturnValue(null)
  const selectPersonById = jest
    .spyOn(personDetailsSelectors, 'personDetailsSelector')
    .mockReturnValue(mockPersonDetails)

  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot without params', () => {
    jest.mocked(useParams).mockReturnValueOnce({})
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleGoToCast" method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleGoToCredits()
    })

    expect(navigate).toHaveBeenCalledWith('credits')
  })

  it('should check "useEffect" method', () => {
    const fetchPersonDetails = jest.spyOn(
      personDetailsActions,
      'fetchPersonDetails'
    )
    selectPersonById.mockReturnValueOnce(undefined as never)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalled()
    expect(fetchPersonDetails).toHaveBeenCalledWith(1234)
  })
})
