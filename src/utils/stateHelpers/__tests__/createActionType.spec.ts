import createActionType from '../createActionType'

describe('createActionType', () => {
  it('should return correct result', () => {
    expect(createActionType('a', 'b', 'c')).toBe('a/b/c')
  })
})
