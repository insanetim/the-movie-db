import { act } from '@testing-library/react'
import React from 'react'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import * as reactRedux from 'src/store/hooks'
import * as personDetailsActions from 'src/store/personDetails/actions'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'
import { FilterOptions } from '../types'

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ personSlug: '1234-darth-maul' })),
}))

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('Credits useContainer hook', () => {
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

  it('should match snapshot with "cast" filter', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    act(() => {
      result.current.handleChangeFilter(FilterOptions.Cast)
    })

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot with "crew" filter', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    act(() => {
      result.current.handleChangeFilter(FilterOptions.Crew)
    })

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleChangeFilter" method', () => {
    const setState = jest.fn()
    // @ts-expect-error - mocking useState
    jest.spyOn(React, 'useState').mockImplementation(init => [init, setState])

    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    act(() => {
      result.current.handleChangeFilter(FilterOptions.Cast)
    })

    expect(setState).toHaveBeenCalledWith(FilterOptions.Cast)
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
