import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import { dispatch } from 'src/__mocks__/react-redux'
import * as personDetailsActions from 'src/store/personDetails/actions'
import * as personDetailsSelectors from 'src/store/personDetails/selectors'

import useContainer from '../hook'
import { FilterOptions } from '../types'

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ personSlug: '1234-darth-maul' })),
}))

jest.mock('src/store/personDetails/selectors')

describe('Credits useContainer hook', () => {
  jest
    .spyOn(personDetailsSelectors, 'personDetailsLoadingSelector')
    .mockReturnValue(false)
  jest
    .spyOn(personDetailsSelectors, 'personDetailsErrorSelector')
    .mockReturnValue(null)
  const selectPersonById = jest
    .spyOn(personDetailsSelectors, 'personDetailsSelector')
    .mockReturnValue(mockPersonDetails)
  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(() => [FilterOptions.All, setState])

  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot with "cast" filter', () => {
    useStateSpy.mockImplementationOnce(() => [FilterOptions.Cast, setState])
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot with "crew" filter', () => {
    useStateSpy.mockImplementationOnce(() => [FilterOptions.Crew, setState])
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot without params', () => {
    jest.mocked(useParams).mockReturnValueOnce({})
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleChangeFilter" method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleChangeFilter(FilterOptions.Cast)
    })

    expect(setState).toHaveBeenCalledWith('cast')
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
