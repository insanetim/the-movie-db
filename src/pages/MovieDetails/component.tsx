import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Popover, Row, Typography } from 'antd'
import { format } from 'date-fns'
import { isEmpty, isNil } from 'ramda'
import { Helmet } from 'react-helmet'
import Budget from 'src/components/MovieDetail/Budget'
import CastList from 'src/components/MovieDetail/CastList'
import Genres from 'src/components/MovieDetail/Genres'
import ImageGallery from 'src/components/MovieDetail/ImageGallery'
import OriginalLanguage from 'src/components/MovieDetail/OriginalLanguage'
import Overview from 'src/components/MovieDetail/Overview'
import PopoverContent from 'src/components/MovieDetail/PopoverContent'
import Revenue from 'src/components/MovieDetail/Revenue'
import Runtime from 'src/components/MovieDetail/Runtime'
import AddToFavoriteButton from 'src/components/UI/Buttons/AddToFavoriteButton'
import AddToWatchlistButton from 'src/components/UI/Buttons/AddToWatchlistButton'
import IconButton from 'src/components/UI/Buttons/IconButton'
import Empty from 'src/components/UI/Empty/component'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'

const MovieDetails: React.FC = () => {
  const {
    error,
    handleFavoriteClick,
    handleGoToCast,
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
    return <Empty description='Movie not found' />
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
          images={movie.images.backdrops.slice(0, 7)}
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
            inFavorite={movie.account_states.favorite}
          />
          <AddToWatchlistButton
            data-testid='addToWatchlistBtn'
            handleClick={handleWatchlistClick}
            inWatchlist={movie.account_states.watchlist}
          />
        </PageTitle>
        <Row>
          {!isEmpty(movie.overview) && <Overview overview={movie.overview} />}
          {movie.original_language && (
            <OriginalLanguage originalLanguage={movie.original_language} />
          )}
          {movie.runtime !== 0 && <Runtime runtime={movie.runtime} />}
          {movie.budget !== 0 && <Budget budget={movie.budget} />}
          {movie.revenue !== 0 && <Revenue revenue={movie.revenue} />}
          {!isEmpty(movie.genres) && <Genres genres={movie.genres} />}
          {!isEmpty(movie.credits.cast) && (
            <>
              <Divider />
              <CastList cast={movie.credits.cast.slice(0, 12)} />
            </>
          )}
          {(movie.credits.cast.length > 12 ||
            movie.credits.crew.length > 12) && (
            <Col
              className='top-margin text-center'
              span={24}
            >
              <Button
                ghost
                onClick={handleGoToCast}
                type='primary'
              >
                Full Cast & Crew
              </Button>
            </Col>
          )}
        </Row>
      </div>
    </>
  )
}

export default MovieDetails
