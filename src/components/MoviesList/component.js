import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import Empty from 'src/components/UI/Empty'
import MovieItem from 'src/components/MovieItem'
import Pagination from 'src/components/UI/Pagination'

const MoviesList = ({ movies, actions, emptyText, handlePagination }) => {
  if (movies.results?.length === 0) {
    return <Empty description={emptyText} />
  }

  return (
    <>
      <Row gutter={[24, 16]}>
        {movies.results?.map(movie => (
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
      {movies.total_pages > 1 && (
        <Pagination
          current={movies.page}
          pageSize={20}
          total={movies.total_results}
          onChange={handlePagination}
        />
      )}
    </>
  )
}

MoviesList.propTypes = {
  movies: PropTypes.shape({
    page: PropTypes.number,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        overview: PropTypes.string,
        poster_path: PropTypes.string
      })
    ),
    total_pages: PropTypes.number,
    total_results: PropTypes.number
  }),
  actions: PropTypes.arrayOf(PropTypes.node),
  emptyText: PropTypes.string,
  handlePagination: PropTypes.func.isRequired
}

MoviesList.defaultProps = {
  movies: {},
  actions: [],
  emptyText: 'No results'
}

export default MoviesList
