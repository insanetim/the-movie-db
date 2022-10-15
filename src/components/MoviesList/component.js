import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import Empty from 'src/components/Empty'
import Movie from 'src/components/MovieItem'
import Pagination from 'src/components/Pagination'

const MoviesList = ({ movies, actions, emptyText, handlePagination }) => {
  if (!movies.results.length) {
    return <Empty description={emptyText} />
  }

  return (
    <>
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
            {movies.results.map(movie => (
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
  movies: [],
  actions: [],
  emptyText: 'No results'
}

export default MoviesList
