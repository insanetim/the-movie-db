import { renderHook } from '@testing-library/react'
import { ICrew } from 'src/interfaces/movie.interface'

import useContainer from '../hook'

describe('CrewList useContainer hook', () => {
  const props = { crew: [{ department: 'A' }, { department: 'B' }] as ICrew[] }

  it('should match snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })
})
