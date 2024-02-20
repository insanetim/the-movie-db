import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { assoc } from 'ramda'
import { mockMovie } from 'src/__mocks__/mockMovie'

import MovieItem from '../component'
import { MovieItemHookReturn, MovieItemProps } from '../types'

const mockedHook: MovieItemHookReturn = {
  handleClick: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('MovieItem component', () => {
  const props: MovieItemProps = {
    handleMovieDelete: jest.fn(),
    id: mockMovie.id,
    overview: mockMovie.overview,
    posterPath: mockMovie.poster_path,
    title: mockMovie.title,
  }

  it('should match snapshot', () => {
    const { asFragment } = render(<MovieItem {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without poster_path', () => {
    const newProps = assoc('posterPath', undefined, props)
    const { asFragment } = render(<MovieItem {...newProps} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleClick" when card clicked', async () => {
    render(<MovieItem {...props} />)

    const user = userEvent.setup()
    const card = screen.getByTestId('movieItemCard')
    await user.click(card)

    expect(mockedHook.handleClick).toHaveBeenCalled()
  })

  it('should call "handleMovieDelete" when delete button clicked', async () => {
    render(<MovieItem {...props} />)

    const user = userEvent.setup()
    const deleteBtn = screen.getByTestId('deleteMovieBtn')
    await user.click(deleteBtn)

    expect(props.handleMovieDelete).toHaveBeenCalled()
  })
})
