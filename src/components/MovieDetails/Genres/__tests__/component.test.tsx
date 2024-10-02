import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Genres from '../component'

describe('Genres component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <Genres genres={[{ id: 1, name: 'test/genre' }]} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
