import { render } from '@testing-library/react'

import Overview from '../component'

describe('Overview component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Overview overview='test/overview' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
