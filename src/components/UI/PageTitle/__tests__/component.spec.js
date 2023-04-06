import { render } from '@testing-library/react'

import PageTitle from '../component'

describe('PageTitle component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<PageTitle>test/title</PageTitle>)

    expect(asFragment()).toMatchSnapshot()
  })
})
