import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Status from '../component'

describe('Status component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Status status='Released' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
