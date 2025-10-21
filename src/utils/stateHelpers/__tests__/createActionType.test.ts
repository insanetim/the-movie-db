import createActionType from '../createActionType'

describe('createActionType', () => {
  it('should join action type segments with forward slashes', () => {
    const domain = 'a'
    const action = 'b'
    const detail = 'c'
    const result = createActionType(domain, action, detail)

    expect(result).toBe('a/b/c')
  })
})
