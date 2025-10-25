import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Loading from '../component'

describe('Loading component', () => {
  it('renders centered spinner with styling', () => {
    const { container } = renderWithWrapper(<Loading />)

    expect(container.querySelector('.top-margin')).toBeInTheDocument()
    expect(container.querySelector('.ant-spin')).toBeInTheDocument()
  })
})
