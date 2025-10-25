import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import PageTitle from '../component'

describe('PageTitle component', () => {
  it('wraps children with layout containers', () => {
    const { container } = renderWithWrapper(<PageTitle>test/title</PageTitle>)

    expect(container.querySelector('.ant-row')).toBeInTheDocument()
    expect(container.querySelector('.ant-col')).toBeInTheDocument()
    expect(container.textContent).toContain('test/title')
  })
})
