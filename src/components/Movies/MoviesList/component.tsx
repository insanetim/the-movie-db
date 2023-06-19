import { Col, Row } from 'antd'
import MovieItem from 'src/components/Movies/MovieItem'

import { MoviesListProps } from './types'

const MoviesList: React.FC<MoviesListProps> = ({ handleMovieDelete, movies }) => {
  return (
    <Row gutter={[24, 16]}>
      {movies.map(movie => (
        <Col
          key={movie.id}
          lg={8}
          md={8}
          sm={12}
          span={24}
          xl={6}
        >
          <MovieItem
            handleMovieDelete={handleMovieDelete}
            movie={movie}
          />
        </Col>
      ))}
    </Row>
  )
}

export default MoviesList
