import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import Empty from 'src/components/UI/Empty'
import MovieItem from 'src/components/Movies/MovieItem'

const MoviesList = ({ movies, actions, emptyText }) => {
  if (!movies.length) {
    return <Empty description={emptyText} />
  }

  return (
    <Row gutter={[24, 16]}>
      {movies.map(movie => (
        <Col
          key={movie.id}
          span={24}
          sm={12}
          md={8}
          lg={8}
          xl={6}
        >
          <MovieItem
            movie={movie}
            actions={actions}
          />
        </Col>
      ))}
    </Row>
  )
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      overview: PropTypes.string,
      poster_path: PropTypes.string
    })
  ),
  actions: PropTypes.arrayOf(PropTypes.node),
  emptyText: PropTypes.string
}

MoviesList.defaultProps = {
  movies: [],
  actions: [],
  emptyText: 'No results'
}

export default MoviesList
