import { render } from '@testing-library/react'

import Loading from '../component'

describe('Loading component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Loading />)

    expect(asFragment()).toMatchSnapshot()
  })
})
