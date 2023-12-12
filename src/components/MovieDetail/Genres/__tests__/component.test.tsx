import { render } from '@testing-library/react'

import Genres from '../component'

describe('Genres component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Genres genres={[{ id: 1, name: 'test/genre' }]} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
