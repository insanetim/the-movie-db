import { renderHook } from '@testing-library/react'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'

import useContainer from '../hook'
import { KnownForHookProps } from '../types'

describe('CrewList useContainer hook', () => {
  const props: KnownForHookProps = {
    credits: mockPersonDetails.movie_credits,
    department: 'Acting',
  }

  it('should match snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot with other data', () => {
    props.department = 'Directing'
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })
})
