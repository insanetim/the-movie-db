import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ListItem from '../../ListItem'
import ListsList from '../component'

jest.mock('../../ListItem', () => ({
  __esModule: true,
  default: jest.fn(({ description, listId, name }) => (
    <div data-testid='list-item'>
      <span>{name}</span>
      <span>{description}</span>
      <span data-testid={`list-item-${listId}`} />
    </div>
  )),
}))

const mockedListItem = ListItem as jest.Mock

describe('ListsList component', () => {
  const lists = [
    {
      description: 'First description',
      id: 11,
      name: 'First list',
    },
    {
      description: 'Second description',
      id: 22,
      name: 'Second list',
    },
  ]

  beforeEach(() => {
    mockedListItem.mockClear()
  })

  it('renders a column and ListItem for every list entry', () => {
    const { container } = renderWithWrapper(<ListsList lists={lists} />)

    expect(screen.getAllByTestId('list-item')).toHaveLength(lists.length)
    expect(container.querySelectorAll('.ant-col')).toHaveLength(lists.length)
    expect(screen.getByText('First list')).toBeInTheDocument()
    expect(screen.getByText('Second list')).toBeInTheDocument()
  })

  it('passes each list to ListItem component', () => {
    renderWithWrapper(<ListsList lists={lists} />)

    lists.forEach((list, index) => {
      expect(mockedListItem.mock.calls[index][0]).toEqual(
        expect.objectContaining({
          description: list.description,
          listId: list.id,
          name: list.name,
        })
      )
    })
  })
})
