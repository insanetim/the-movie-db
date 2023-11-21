import createActionType from '../createActionType'

describe('createActionType', () => {
  it('should return correct result', () => {
    const result = createActionType('a', 'b', 'c')

    expect(result).toBe('a/b/c')
  })
})
