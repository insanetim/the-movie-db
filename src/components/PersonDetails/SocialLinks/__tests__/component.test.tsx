import { screen } from '@testing-library/react'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import SocialLinks from '../component'

describe('SocialLinks component', () => {
  it('renders all available social links with proper attributes', () => {
    renderWithWrapper(
      <SocialLinks externalIds={mockPersonDetails.external_ids} />
    )

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(4)
    expect(links[0]).toHaveAttribute(
      'href',
      'https://facebook.com/facebook_user'
    )
    expect(links[1]).toHaveAttribute(
      'href',
      'https://instagram.com/instagram_user'
    )
    expect(links[2]).toHaveAttribute('href', 'https://tiktok.com/@tiktok_user')
    expect(links[3]).toHaveAttribute('href', 'https://twitter.com/twitter_user')
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })

  it('omits social links when ids are missing', () => {
    renderWithWrapper(
      <SocialLinks
        externalIds={{
          facebook_id: undefined,
          instagram_id: undefined,
          tiktok_id: undefined,
          twitter_id: 'only_twitter',
        }}
      />
    )

    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('href', 'https://twitter.com/only_twitter')
  })
})
