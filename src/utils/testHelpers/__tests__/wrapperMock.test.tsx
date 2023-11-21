import { render } from '@testing-library/react'

import Wrapper from '../wrapperMock'

describe('mockWrapper component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Wrapper>
        <div>test/children</div>
      </Wrapper>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
