import { render } from '@testing-library/react'

import Status from '../component'

describe('Status component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Status status='Released' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
