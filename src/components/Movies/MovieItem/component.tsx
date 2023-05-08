import { Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import NoImage from 'src/assets/images/no-image.svg'
import type { MovieItemProps } from './types'
import useContainer from './hook'
import isNull from 'src/utils/helpers/isNull'

const MovieItem: React.FC<MovieItemProps> = ({ movie, handleMovieDelete }) => {
  const { handleClick } = useContainer({ movieId: movie.id })

  let cover = (
    <div className='ant-card-cover--no-image'>
      <img
        src={NoImage}
        alt={movie.title}
      />
    </div>
  )
  if (!isNull(movie.poster_path)) {
    cover = (
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt='Poster'
      />
    )
  }

  let actions
  if (typeof handleMovieDelete !== 'undefined') {
    actions = [
      <DeleteOutlined
        key='delete'
        onClick={e => handleMovieDelete(movie.id, e)}
        data-testid='deleteMovieAction'
      />
    ]
  }

  return (
    <Card
      hoverable
      cover={cover}
      actions={actions}
      onClick={handleClick}
    >
      <Card.Meta
        title={movie.title}
        description={movie.overview}
      />
    </Card>
  )
}

export default MovieItem
