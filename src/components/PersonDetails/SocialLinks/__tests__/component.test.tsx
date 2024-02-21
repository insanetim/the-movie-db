import { render } from '@testing-library/react'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'

import SocialLinks from '../component'

describe('SocialLinks component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <SocialLinks externalIds={mockPersonDetails.external_ids} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
