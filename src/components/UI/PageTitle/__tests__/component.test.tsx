import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import PageTitle from '../component'

describe('PageTitle component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<PageTitle>test/title</PageTitle>)

    expect(asFragment()).toMatchSnapshot()
  })
})
