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

describe('Credits useContainer hook', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector')

  it('should match snapshot', () => {
    useSelectorMock
      .mockReturnValueOnce(mockPersonDetails)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)

    const { result } = renderHookWithWrapper(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot with "cast" filter', () => {
    useSelectorMock
      .mockReturnValueOnce(mockPersonDetails)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)

    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      useSelectorMock
        .mockReturnValueOnce(mockPersonDetails)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(null)

      result.current.handleChangeFilter(FilterOptions.Cast)
    })

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot with "crew" filter', () => {
    useSelectorMock
      .mockReturnValueOnce(mockPersonDetails)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)

    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      useSelectorMock
        .mockReturnValueOnce(mockPersonDetails)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(null)

      result.current.handleChangeFilter(FilterOptions.Crew)
    })

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleChangeFilter" method', () => {
    const setState = jest.fn()
    // @ts-expect-error - mocking useState
    jest.spyOn(React, 'useState').mockImplementation(init => [init, setState])

    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      result.current.handleChangeFilter(FilterOptions.Cast)
    })

    expect(setState).toHaveBeenCalledWith(FilterOptions.Cast)
  })

  it('should check "useEffect" method', () => {
    const mockDispatch = jest.fn()
    jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)
    const fetchPersonDetails = jest.spyOn(
      personDetailsActions,
      'fetchPersonDetails'
    )

    renderHookWithWrapper(useContainer)

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchPersonDetails).toHaveBeenCalledWith(1234)
  })
})
