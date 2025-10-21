import errorMessage from '../errorMessage'

describe('errorMessage', () => {
  it('should return default error message for empty error object', () => {
    const error = {}
    const result = errorMessage(error)

    expect(result).toBe('Something went wrong!')
  })

  it('should return specific error message from error data', () => {
    const error = { data: { status_message: 'test/message' } }
    const result = errorMessage(error)

    expect(result).toBe('test/message')
  })
})
