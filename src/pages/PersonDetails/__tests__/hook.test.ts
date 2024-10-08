import { act } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import * as reactRedux from 'src/store/hooks'
import * as personDetailsActions from 'src/store/personDetails/actions'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(() => ({ personSlug: '1234-darth-maul' })),
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('PersonDetails useContainer hook', () => {
  const mockState = {
    personDetails: {
      entities: {
        [mockPersonDetails.id]: mockPersonDetails,
      },
      error: null,
      ids: [mockPersonDetails.id],
      loading: false,
    },
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleGoToCast" method', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    act(() => {
      result.current.handleGoToCredits()
    })

    expect(navigate).toHaveBeenCalledWith('credits')
  })

  it('should check "useEffect" method', () => {
    const mockState = {
      personDetails: {
        entities: {},
        error: null,
        ids: [],
        loading: false,
      },
    }
    const fetchPersonDetails = jest.spyOn(
      personDetailsActions,
      'fetchPersonDetails'
    )

    renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchPersonDetails).toHaveBeenCalledWith(1234)
  })
})
