import { DeleteOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import NoImage from 'src/assets/images/no-image.svg'
import isNull from 'src/utils/helpers/isNull'

import type { MovieItemProps } from './types'

import useContainer from './hook'

const MovieItem: React.FC<MovieItemProps> = ({ handleMovieDelete, movie }) => {
  const { handleClick } = useContainer({ movieId: movie.id })

  let cover = (
    <div className='ant-card-cover--no-image'>
      <img
        alt={movie.title}
        src={NoImage}
      />
    </div>
  )
  if (!isNull(movie.poster_path)) {
    cover = (
      <img
        alt={movie.title}
        height={750}
        loading='lazy'
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        width={500}
      />
    )
  }

  let actions
  if (typeof handleMovieDelete !== 'undefined') {
    actions = [
      <DeleteOutlined
        data-testid='deleteMovieAction'
        key='delete'
        onClick={e => handleMovieDelete(movie.id, e)}
      />
    ]
  }

  return (
    <Card
      actions={actions}
      cover={cover}
      hoverable
      onClick={handleClick}
    >
      <Card.Meta
        description={movie.overview}
        title={movie.title}
      />
    </Card>
  )
}

export default MovieItem
