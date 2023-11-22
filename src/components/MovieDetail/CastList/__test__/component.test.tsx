import { render } from '@testing-library/react'
import { mockCast } from 'src/__mocks__/mockMovie'

import CastList from '../component'

describe('CastList component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<CastList cast={[mockCast]} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
