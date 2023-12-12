import { render } from '@testing-library/react'

import Budget from '../component'

describe('Budget component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Budget budget={1000000} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
