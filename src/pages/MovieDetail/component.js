import { Row, Col, Typography, Tag, Popover } from 'antd'
import Icon, { HeartOutlined, HeartFilled, BookOutlined, BookFilled, PlusCircleOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import ISO6391 from 'iso-639-1'
import { take, toUpper } from 'ramda'

import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import ImageGallery from 'src/components/MovieDetail/ImageGallery'
import PopoverContent from 'src/components/MovieDetail/PopoverContent'
import CastList from 'src/components/MovieDetail/CastList'
import CrewList from 'src/components/MovieDetail/CrewList'
import { convertDuration, convertMoney } from 'src/utils'
import useContainer from './hook'

const Movie = () => {
  const { movie, loading, error, handleFavoriteClick, handleWatchlistClick, popoverOpen, setPopoverOpen } =
    useContainer()

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

  return (
    <>
      {movie.images.length > 0 && <ImageGallery images={movie.images} />}
      <div className='container top-margin'>
        <Row>
          <Col span={24}>
            <Typography.Title>
              <span>
                {movie.title}
                {movie.release_date && ` (${format(new Date(movie.release_date), 'yyyy')})`}
              </span>{' '}
              <Popover
                title='Add movie to list'
                trigger='click'
                placement='top'
                destroyTooltipOnHide
                open={popoverOpen}
                onOpenChange={open => setPopoverOpen(open)}
                content={
                  <PopoverContent
                    movieId={movie.id}
                    setPopoverOpen={setPopoverOpen}
                  />
                }
              >
                <PlusCircleOutlined data-testid='addMovieToListPopover' />
              </Popover>{' '}
              <Icon
                component={movie.accountStates.favorite ? HeartFilled : HeartOutlined}
                onClick={handleFavoriteClick}
              />{' '}
              <Icon
                component={movie.accountStates.watchlist ? BookFilled : BookOutlined}
                onClick={handleWatchlistClick}
              />
            </Typography.Title>
            {movie.overview && (
              <>
                <Typography.Title level={3}>Overview</Typography.Title>
                <Typography.Paragraph>{movie.overview}</Typography.Paragraph>
              </>
            )}
          </Col>
          {movie.original_language && (
            <Col span={24}>
              <Typography.Paragraph>
                <b>Original Language: </b>
                <span>{ISO6391.getName(movie.original_language)}</span>
              </Typography.Paragraph>
            </Col>
          )}
          {movie.runtime !== 0 && (
            <Col span={24}>
              <Typography.Paragraph>
                <b>Runtime: </b>
                <span>{convertDuration(movie.runtime)}</span>
              </Typography.Paragraph>
            </Col>
          )}
          {movie.budget !== 0 && (
            <Col span={24}>
              <Typography.Paragraph>
                <b>Budget: </b>
                <span>{convertMoney(movie.budget)}</span>
              </Typography.Paragraph>
            </Col>
          )}
          {movie.revenue !== 0 && (
            <Col span={24}>
              <Typography.Paragraph>
                <b>Revenue: </b>
                <span>{convertMoney(movie.revenue)}</span>
              </Typography.Paragraph>
            </Col>
          )}
          {movie.genres.length > 0 && (
            <Col span={24}>
              <Typography.Paragraph>
                <b>Genres: </b>
                {movie.genres.map(({ id, name }) => (
                  <Tag key={id}>{toUpper(name)}</Tag>
                ))}
              </Typography.Paragraph>
            </Col>
          )}
          {movie.credits.cast.length > 0 && <CastList cast={take(12, movie.credits.cast)} />}
          {movie.credits.crew.length > 0 && <CrewList crew={take(12, movie.credits.crew)} />}
        </Row>
      </div>
    </>
  )
}

export default Movie
