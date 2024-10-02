import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import SocialLinks from '../component'

describe('SocialLinks component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <SocialLinks externalIds={mockPersonDetails.external_ids} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
