import showModal from '../showModal'

describe('showModal', () => {
  it('has valid attributes', () => {
    expect(showModal).toMatchSnapshot()
  })

  it('transform action', () => {
    const action = {
      payload: {}
    }
    const next = jest.fn()

    showModal.transform({ action }, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith({
      payload: { modalProps: { open: true } }
    })
  })
})
