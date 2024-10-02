import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Revenue from '../component'

describe('Revenue component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Revenue revenue={3000000} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
