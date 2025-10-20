import listMessage from '../listMessage'

describe('listMessage', () => {
  it('should return correct value for add', () => {
    const result = listMessage({
      listName: 'list',
      movieTitle: 'Movie',
      type: 'add',
    })

    expect(result).toBe('Movie added to list')
  })

  it('should return correct value for remove', () => {
    const result = listMessage({
      listName: 'list',
      movieTitle: 'Movie',
      type: 'remove',
    })

    expect(result).toBe('Movie removed from list')
  })
})
