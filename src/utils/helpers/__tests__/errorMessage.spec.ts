import errorMessage from '../errorMessage'

describe('errorMessage', () => {
  it('returns correct value', () => {
    const error = { response: { data: { status_message: 'test/message' } } }

    expect(errorMessage(error)).toBe('test/message')
  })

  it('returns default value', () => {
    const error = {}

    expect(errorMessage(error)).toBe('Something went wrong!')
  })
})
