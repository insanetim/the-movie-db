import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Overview from '../component'

describe('Overview component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <Overview overview='test/overview' />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
