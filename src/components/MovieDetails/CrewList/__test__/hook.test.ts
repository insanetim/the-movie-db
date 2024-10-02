import { IMovieCredit } from 'src/interfaces/movie.interface'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'
import { CrewListHookProps } from '../types'

describe('CrewList useContainer hook', () => {
  const props: CrewListHookProps = {
    crew: [{ department: 'A' }, { department: 'B' }] as IMovieCredit[],
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })
})
