import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'
import { CountriesHookProps } from '../types'

describe('CrewList useContainer hook', () => {
  const props: CountriesHookProps = {
    countries: [{ iso_3166_1: 'US', name: 'United States of America' }],
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot with other data', () => {
    props.countries.push({ iso_3166_1: 'GB', name: 'United Kingdom' })

    const { result } = renderHookWithWrapper(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })
})
