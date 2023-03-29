import { render } from '@testing-library/react'

import MovieItem from '../component'
import Wrapper from '../../../__mocks__/wrapperMock'

const mockedHookData = {
  handleClick: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

jest.mock('src/utils', () => ({
  bindId: jest.fn(node => node)
}))

describe('MovieItem component', () => {
  it('matches snapshot', () => {
    const props = {
      movie: {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/image'
      },
      actions: [
        <div
          key='delete'
          onClick={jest.fn()}
        />
      ]
    }
    const { asFragment } = render(<MovieItem {...props} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with NoImage', () => {
    const props = {
      movie: {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: null
      }
    }
    const { asFragment } = render(<MovieItem {...props} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
