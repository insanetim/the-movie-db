import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import Empty from 'src/components/UI/Empty'
import MovieItem from 'src/components/MovieItem'

const ListContent = ({ movies, actions }) => {
  if (!movies.length) {
    return <Empty description='No results' />
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

ListContent.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      overview: PropTypes.string,
      poster_path: PropTypes.string
    })
  ),
  actions: PropTypes.arrayOf(PropTypes.node)
}

ListContent.defaultProps = {
  movies: [],
  actions: []
}

export default ListContent
