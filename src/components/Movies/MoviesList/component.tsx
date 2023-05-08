import { Row, Col } from 'antd'

import MovieItem from 'src/components/Movies/MovieItem'
import { MoviesListProps } from './types'

const MoviesList: React.FC<MoviesListProps> = ({ movies, handleMovieDelete }) => {
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
            handleMovieDelete={handleMovieDelete}
          />
        </Col>
      ))}
    </Row>
  )
}

export default MoviesList
