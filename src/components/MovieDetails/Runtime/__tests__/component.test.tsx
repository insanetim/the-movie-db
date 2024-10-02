import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Runtime from '../component'

describe('Runtime component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Runtime runtime={150} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
