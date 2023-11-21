import listMessage from '../listMessage'

describe('listMessage', () => {
  it('should return correct value', () => {
    const result = listMessage('Movie', 'list')

    expect(result).toBe('Movie added to list')
  })
})
