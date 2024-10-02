import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Loading from '../component'

describe('Loading component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Loading />)

    expect(asFragment()).toMatchSnapshot()
  })
})
