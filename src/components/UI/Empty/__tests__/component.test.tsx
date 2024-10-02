import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Empty from '../component'

describe('Empty component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Empty />)

    expect(asFragment()).toMatchSnapshot()
  })
})
