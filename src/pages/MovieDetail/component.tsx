import { PlusCircleOutlined } from '@ant-design/icons'
import { Col, Popover, Row, Tag, Typography } from 'antd'
import { format } from 'date-fns'
import ISO6391 from 'iso-639-1'
import { isEmpty, isNil } from 'ramda'
import { Helmet } from 'react-helmet'
import CastList from 'src/components/MovieDetail/CastList'
import CrewList from 'src/components/MovieDetail/CrewList'
import ImageGallery from 'src/components/MovieDetail/ImageGallery'
import PopoverContent from 'src/components/MovieDetail/PopoverContent'
import AddToFavoriteButton from 'src/components/UI/Buttons/AddToFavoriteButton'
import AddToWatchlistButton from 'src/components/UI/Buttons/AddToWatchlistButton'
import IconButton from 'src/components/UI/Buttons/IconButton'
import Empty from 'src/components/UI/Empty/component'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
import convertDuration from 'src/utils/convertDataHelpers/convertDuration'
import convertMoney from 'src/utils/convertDataHelpers/convertMoney'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'

const Movie: React.FC = () => {
  const {
    error,
    handleFavoriteClick,
    handleWatchlistClick,
    loading,
    movie,
    popoverOpen,
    setPopoverOpen,
  } = useContainer()

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
    return (
      <div>
        <Empty description='Movie not found' />
      </div>
    )
  }

  const title = `${movie.title}${
    movie.release_date
      ? ` (${format(new Date(movie.release_date), 'yyyy')})`
      : ''
  }`

  return (
    <>
      <Helmet title={metaTitle(title)} />
      {!isEmpty(movie.images) && (
        <ImageGallery
          images={movie.images}
          title={movie.title}
        />
      )}
      <div className='container top-margin'>
        <PageTitle>
          <Typography.Title style={{ marginBottom: 0 }}>
            {title}
          </Typography.Title>
          <Popover
            content={
              <PopoverContent
                movieId={movie.id}
                setPopoverOpen={setPopoverOpen}
              />
            }
            destroyTooltipOnHide
            onOpenChange={open => setPopoverOpen(open)}
            open={popoverOpen}
            placement='top'
            title='Add movie to list'
            trigger='click'
          >
            <IconButton
              data-testid='addMovieToListPopover'
              icon={<PlusCircleOutlined />}
            />
          </Popover>
          <AddToFavoriteButton
            data-testid='addToFavoriteBtn'
            handleClick={handleFavoriteClick}
            inFavorite={movie.accountStates.favorite}
          />
          <AddToWatchlistButton
            data-testid='addToWatchlistBtn'
            handleClick={handleWatchlistClick}
            inWatchlist={movie.accountStates.watchlist}
          />
        </PageTitle>
        <Row>
          {!isEmpty(movie.overview) && (
            <Col span={24}>
              <Typography.Title level={3}>Overview</Typography.Title>
              <Typography.Paragraph>{movie.overview}</Typography.Paragraph>
            </Col>
          )}
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
          {!isEmpty(movie.genres) && (
            <Col span={24}>
              <Typography.Paragraph>
                <b>Genres: </b>
                {movie.genres.map(({ id, name }) => (
                  <Tag key={id}>{name.toUpperCase()}</Tag>
                ))}
              </Typography.Paragraph>
            </Col>
          )}
          {!isEmpty(movie.credits.cast) && (
            <CastList cast={movie.credits.cast.slice(0, 12)} />
          )}
          {!isEmpty(movie.credits.crew) && (
            <CrewList crew={movie.credits.crew.slice(0, 12)} />
          )}
        </Row>
      </div>
    </>
  )
}

export default Movie
