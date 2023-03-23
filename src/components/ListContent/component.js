import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import Empty from 'src/components/Empty'
import Movie from 'src/components/MovieItem'

const ListContent = ({ movies, actions }) => {
  if (!movies.length) {
    return <Empty description='No results' />
  }

  return (
    <Row
      gutter={16}
      justify='center'
    >
      <Col span={20}>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32
          }}
        >
          {movies.map(movie => (
            <Col
              key={movie.id}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
            >
              <Movie
                movie={movie}
                actions={actions}
              />
            </Col>
          ))}
        </Row>
      </Col>
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
