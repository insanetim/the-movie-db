import { mockMovieDetailExtended } from 'src/__mocks__/mockMovie'
import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import Cast from '../component'
import { CastHookReturn } from '../types'

const mockedHook: CastHookReturn = {
  error: null,
  loading: false,
  movie: mockMovieDetailExtended,
  movieSlug: '1234-test-movie',
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Cast component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Cast />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without release_date', () => {
    mockedHook.movie!.release_date = undefined
    const { asFragment } = renderWithWrapper(<Cast />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty movie', () => {
    mockedHook.movie = undefined
    const { asFragment } = renderWithWrapper(<Cast />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.loading = true
    const { asFragment } = renderWithWrapper(<Cast />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.loading = false
    mockedHook.error = 'Something went wrong!'
    const { asFragment } = renderWithWrapper(<Cast />)

    expect(asFragment()).toMatchSnapshot()
  })
})
