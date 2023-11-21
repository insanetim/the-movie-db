import errorMessage from '../errorMessage'

describe('errorMessage', () => {
  it('should return default value', () => {
    const error = {}
    const result = errorMessage(error)

    expect(result).toBe('Something went wrong!')
  })

  it('should return correct value', () => {
    const error = { response: { data: { status_message: 'test/message' } } }
    const result = errorMessage(error)

    expect(result).toBe('test/message')
  })
})
