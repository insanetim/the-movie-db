import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'
import { KnownForHookProps } from '../types'

describe('CrewList useContainer hook', () => {
  const props: KnownForHookProps = {
    credits: mockPersonDetails.movie_credits,
    department: 'Acting',
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot with other data', () => {
    props.department = 'Directing'

    const { result } = renderHookWithWrapper(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })
})
