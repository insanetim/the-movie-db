import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Footer from '../component'

describe('Footer component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Footer />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
