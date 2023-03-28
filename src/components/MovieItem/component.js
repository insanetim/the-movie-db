import PropTypes from 'prop-types'
import { Card } from 'antd'

import NoImage from 'src/assets/images/no-image.svg'
import { bindId } from 'src/utils'
import useContainer from './hook'

const MovieItem = ({ movie, actions }) => {
  const { handleClick } = useContainer({ movieId: movie.id })

  return (
    <Card
      hoverable
      cover={
        movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt='Poster'
          />
        ) : (
          <div className='ant-card-cover--no-image'>
            <img
              src={NoImage}
              alt=''
            />
          </div>
        )
      }
      actions={bindId(actions, movie.id)}
      onClick={handleClick}
    >
      <Card.Meta
        title={movie.title}
        description={movie.overview}
      />
    </Card>
  )
}

MovieItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string
  }),
  actions: PropTypes.arrayOf(PropTypes.node)
}

MovieItem.defaultProps = {
  movie: {},
  actions: []
}

export default MovieItem
