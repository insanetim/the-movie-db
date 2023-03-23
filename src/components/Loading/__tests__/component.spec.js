import { render } from '@testing-library/react'

import Loading from '../component'

describe('Loading component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Loading />)

    expect(asFragment()).toMatchSnapshot()
  })
})
