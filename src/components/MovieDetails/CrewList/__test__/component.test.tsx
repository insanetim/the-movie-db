import { mockMovieCredit } from 'src/__mocks__/mockMovie'
import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import CrewList from '../component'

describe('CrewList component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <CrewList crew={mockMovieCredit} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
