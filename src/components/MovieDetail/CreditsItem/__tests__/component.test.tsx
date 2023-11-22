import { render } from '@testing-library/react'

import CreditsItem from '../component'
import { CreditsItemProps } from '../types'

describe('CreditsItem component', () => {
  const props: CreditsItemProps = {
    description: 'test/description',
    profilePath: 'test/image',
    title: 'test/title'
  }
  it('should match snapshot', () => {
    const { asFragment } = render(<CreditsItem {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without profilePath', () => {
    props.profilePath = null
    const { asFragment } = render(<CreditsItem {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
