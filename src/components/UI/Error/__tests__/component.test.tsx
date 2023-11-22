import { render } from '@testing-library/react'

import Error from '../component'

describe('Error component', () => {
  it('should match snapshot', () => {
    const error = 'Something went wrong!'
    const { asFragment } = render(<Error error={error} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
