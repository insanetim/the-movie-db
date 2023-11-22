import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import EmptyLayout from '../component'

describe('EmptyLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<EmptyLayout />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
