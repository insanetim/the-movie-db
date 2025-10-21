import listMessage from '../listMessage'

describe('listMessage', () => {
  it('should return message for adding item to list', () => {
    const messageData = {
      listName: 'list',
      movieTitle: 'Movie',
      type: 'add' as const,
    }
    const result = listMessage(messageData)

    expect(result).toBe('Movie added to list')
  })

  it('should return message for removing item from list', () => {
    const messageData = {
      listName: 'list',
      movieTitle: 'Movie',
      type: 'remove' as const,
    }
    const result = listMessage(messageData)

    expect(result).toBe('Movie removed from list')
  })
})
