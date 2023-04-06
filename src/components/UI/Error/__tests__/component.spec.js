import { render } from '@testing-library/react'

import Error from '../component'

describe('Error component', () => {
  it('matches snapshot', () => {
    const error = {
      message: 'test/errorTitle',
      response: { data: { status_message: 'test/errorSubtitle' } }
    }
    const { asFragment } = render(<Error error={error} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
