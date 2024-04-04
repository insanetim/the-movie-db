import { Divider, Row, Typography } from 'antd'
import { format } from 'date-fns'
import { isNil } from 'ramda'
import { Helmet } from 'react-helmet'
import CastList from 'src/components/MovieDetails/CastList'
import CrewList from 'src/components/MovieDetails/CrewList'
import Empty from 'src/components/UI/Empty'
import Error from 'src/components/UI/Error'
import GoBackLink from 'src/components/UI/GoBackLink'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
import isPresent from 'src/utils/helpers/isPresent'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'

const Cast: React.FC = () => {
  const { error, loading, movie, movieSlug } = useContainer()

  if (loading) {
    return (
      <div className='container top-margin'>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className='container top-margin'>
        <Error error={error} />
      </div>
    )
  }

  if (isNil(movie)) {
    return <Empty description='Movie not found' />
  }

  const title = `${movie.title}${
    movie.release_date ? ` (${format(movie.release_date, 'yyyy')})` : ''
  }`

  return (
    <>
      <Helmet title={metaTitle(title)} />
      <div className='container top-margin'>
        <GoBackLink
          href={`/movie/${movieSlug}`}
          title='Back to movie details'
        />
        <PageTitle>
          <Typography.Title style={{ marginBottom: 0 }}>
            {title}
          </Typography.Title>
        </PageTitle>
        <Row>
          {isPresent(movie.credits.cast) && (
            <CastList
              cast={movie.credits.cast}
              showTotal
            />
          )}
          {isPresent(movie.credits.crew) && (
            <>
              <Divider />
              <CrewList crew={movie.credits.crew} />
            </>
          )}
        </Row>
      </div>
    </>
  )
}

export default Cast
