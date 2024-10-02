import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Budget from '../component'

describe('Budget component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Budget budget={1000000} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
