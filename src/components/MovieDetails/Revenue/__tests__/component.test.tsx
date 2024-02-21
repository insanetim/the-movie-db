import { render } from '@testing-library/react'

import Revenue from '../component'

describe('Revenue component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Revenue revenue={3000000} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
