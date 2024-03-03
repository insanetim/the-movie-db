import { mockMovieCredit } from 'src/__mocks__/mockMovie'
import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import CastList from '../component'

describe('CastList component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <CastList cast={mockMovieCredit} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
