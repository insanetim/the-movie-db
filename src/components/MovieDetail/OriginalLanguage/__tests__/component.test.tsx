import { render } from '@testing-library/react'

import OriginalLanguage from '../component'

describe('OriginalLanguage component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<OriginalLanguage originalLanguage='en' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
