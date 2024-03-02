import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Divider, Row, Typography } from 'antd'
import { format } from 'date-fns'
import { isEmpty, isNil } from 'ramda'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import CastList from 'src/components/MovieDetails/CastList'
import CrewList from 'src/components/MovieDetails/CrewList'
import Empty from 'src/components/UI/Empty'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
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
  const pageTitle = `${title} - Cast & Crew`

  return (
    <>
      <Helmet title={metaTitle(pageTitle)} />
      <div className='container top-margin'>
        <Row>
          <Col span={24}>
            <Typography.Paragraph>
              <Link to={`/movie/${movieSlug}`}>
                <ArrowLeftOutlined /> Back to movie details
              </Link>
            </Typography.Paragraph>
          </Col>
        </Row>
        <PageTitle>
          <Typography.Title style={{ marginBottom: 0 }}>
            {title}
          </Typography.Title>
        </PageTitle>
        <Row>
          {!isEmpty(movie.credits.cast) && (
            <CastList
              cast={movie.credits.cast}
              showTotal
            />
          )}
          {!isEmpty(movie.credits.crew) && (
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
