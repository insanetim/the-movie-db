import { render } from '@testing-library/react'

import Runtime from '../component'

describe('Runtime component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Runtime runtime={150} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
