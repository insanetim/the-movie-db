import { DeleteOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { isNotNil } from 'ramda'
import NoImage from 'src/assets/images/no-image.svg'

import useContainer from './hook'
import { MovieItemProps } from './types'

const MovieItem: React.FC<MovieItemProps> = ({
  handleMovieDelete,
  id,
  overview,
  posterPath,
  title,
}) => {
  const { handleClick } = useContainer({ id })

  let cover = (
    <div className='ant-card-cover--no-image'>
      <img
        alt={title}
        src={NoImage}
      />
    </div>
  )
  if (isNotNil(posterPath)) {
    cover = (
      <img
        alt={title}
        height={750}
        loading='lazy'
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        width={500}
      />
    )
  }

  let actions
  if (isNotNil(handleMovieDelete)) {
    actions = [
      <DeleteOutlined
        data-testid='deleteMovieBtn'
        key='delete'
        onClick={e => handleMovieDelete(id, e)}
      />,
    ]
  }

  return (
    <Card
      actions={actions}
      cover={cover}
      data-testid='movieItemCard'
      hoverable
      onClick={handleClick}
    >
      <Card.Meta
        description={overview}
        title={title}
      />
    </Card>
  )
}

export default MovieItem
