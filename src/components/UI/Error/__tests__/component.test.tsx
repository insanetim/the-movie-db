import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Error from '../component'

describe('Error component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <Error error='Something went wrong!' />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
