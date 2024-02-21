import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import KnownFor from '../component'

describe('KnownFor component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <KnownFor
        credits={mockPersonDetails.movie_credits}
        knownForDepartment='Acting'
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
