import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import DashboardEmpty from 'src/components/Dashboard/DashboardEmpty'
import Movie from 'src/components/MovieItem'

const DashboardContent = ({ movies }) => {
  if (!movies.length) {
    return <DashboardEmpty />
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
              <Movie movie={movie} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

DashboardContent.propTypes = {
  movies: PropTypes.arrayOf()
}

DashboardContent.defaultProps = {
  movies: []
}

export default DashboardContent
