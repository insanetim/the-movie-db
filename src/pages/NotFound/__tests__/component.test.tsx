import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import NotFound from '../component'

describe('NotFound component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<NotFound />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
