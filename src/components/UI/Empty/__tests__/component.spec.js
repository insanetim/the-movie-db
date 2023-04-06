import { render } from '@testing-library/react'

import Empty from '../component'

describe('Empty component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Empty description='No Results' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
