import type { ForwardRefExoticComponent } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { Row, Col, Typography, Tag, Popover } from 'antd'
import Icon, { HeartOutlined, HeartFilled, BookOutlined, BookFilled, PlusCircleOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import ISO6391 from 'iso-639-1'

import isNull from 'src/utils/helpers/isNull'
import convertDuration from 'src/utils/convertDataHelpers/convertDuration'
import convertMoney from 'src/utils/convertDataHelpers/convertMoney'
import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import Empty from 'src/components/UI/Empty/component'
import ImageGallery from 'src/components/MovieDetail/ImageGallery'
import PopoverContent from 'src/components/MovieDetail/PopoverContent'
import CastList from 'src/components/MovieDetail/CastList'
import CrewList from 'src/components/MovieDetail/CrewList'
import useContainer from './hook'

const Movie: React.FC = () => {
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

  if (isNull(movie)) {
    return (
      <div>
        <Empty description='Movie not found' />
      </div>
    )
  }

  const favoriteIcon = (
    movie.accountStates.favorite ? HeartFilled : HeartOutlined
  ) as ForwardRefExoticComponent<CustomIconComponentProps>
  const watchlistIcon = (
    movie.accountStates.watchlist ? BookFilled : BookOutlined
  ) as ForwardRefExoticComponent<CustomIconComponentProps>

  return (
    <>
      {movie.images.length > 0 && (
        <ImageGallery
          images={movie.images}
          title={movie.title}
        />
      )}
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
                component={favoriteIcon}
                onClick={handleFavoriteClick}
              />{' '}
              <Icon
                component={watchlistIcon}
                onClick={handleWatchlistClick}
              />
            </Typography.Title>
            {movie.overview.length > 0 && (
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
                  <Tag key={id}>{name.toUpperCase()}</Tag>
                ))}
              </Typography.Paragraph>
            </Col>
          )}
          {movie.credits.cast.length > 0 && <CastList cast={movie.credits.cast.slice(0, 12)} />}
          {movie.credits.crew.length > 0 && <CrewList crew={movie.credits.crew.slice(0, 12)} />}
        </Row>
      </div>
    </>
  )
}

export default Movie
