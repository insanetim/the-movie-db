import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Pagination from '../component'

describe('Pagination component', () => {
  it('renders Ant Design pagination with provided props', () => {
    const { container } = renderWithWrapper(
      <Pagination
        current={2}
        total={40}
      />
    )

    const pagination = container.querySelector('.pagination')

    expect(pagination).toBeInTheDocument()
    expect(pagination?.querySelector('.ant-pagination-item-2')).toHaveClass(
      'ant-pagination-item-active'
    )
  })
})
