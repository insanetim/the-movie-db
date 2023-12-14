import { Col, Row } from 'antd'
import MovieItem from 'src/components/Movies/MovieItem'

import { MoviesListProps } from './types'

const MoviesList: React.FC<MoviesListProps> = ({
  handleMovieDelete,
  movies,
}) => {
  return (
    <Row gutter={[24, 16]}>
      {movies.map(movie => {
        const { id, overview, poster_path, title } = movie

        return (
          <Col
            key={id}
            lg={8}
            md={8}
            sm={12}
            span={24}
            xl={6}
          >
            <MovieItem
              handleMovieDelete={handleMovieDelete}
              id={id}
              overview={overview}
              posterPath={poster_path}
              title={title}
            />
          </Col>
        )
      })}
    </Row>
  )
}

export default MoviesList
