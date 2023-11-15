import listMessage from '../listMessage'

describe('listMessage', () => {
  it('returns correct value', () => {
    expect(listMessage('Movie', 'list')).toBe('Movie added to list')
  })
})
