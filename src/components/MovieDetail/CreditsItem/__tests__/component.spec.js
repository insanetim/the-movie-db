import { render } from '@testing-library/react'

import CreditsItem from '../component'

describe('CreditsItem component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<CreditsItem profilePath='test/image' />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with NoImage', () => {
    const { asFragment } = render(<CreditsItem profilePath='' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
