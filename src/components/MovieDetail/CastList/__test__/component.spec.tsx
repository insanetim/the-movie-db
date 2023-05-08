import { render } from '@testing-library/react'

import { mockCast } from 'src/__mocks__/mockMovie'
import CastList from '../component'

describe('CastList component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<CastList cast={[mockCast]} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
