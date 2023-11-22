import { render } from '@testing-library/react'

import Empty from '../component'

describe('Empty component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Empty />)

    expect(asFragment()).toMatchSnapshot()
  })
})
