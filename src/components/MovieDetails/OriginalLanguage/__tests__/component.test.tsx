import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import OriginalLanguage from '../component'

describe('OriginalLanguage component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <OriginalLanguage originalLanguage='en' />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
