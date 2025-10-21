import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Popover, Row, Typography } from 'antd'
import { format } from 'date-fns'
import { Helmet } from 'react-helmet'
import Budget from 'src/components/MovieDetails/Budget'
import CastList from 'src/components/MovieDetails/CastList'
import ContentRating from 'src/components/MovieDetails/ContentRating'
import Countries from 'src/components/MovieDetails/Countries'
import Genres from 'src/components/MovieDetails/Genres'
import ImageGallery from 'src/components/MovieDetails/ImageGallery'
import ImdbRating from 'src/components/MovieDetails/ImdbRating'
import OriginalLanguage from 'src/components/MovieDetails/OriginalLanguage'
import Overview from 'src/components/MovieDetails/Overview'
import PopoverContent from 'src/components/MovieDetails/PopoverContent'
import Revenue from 'src/components/MovieDetails/Revenue'
import Runtime from 'src/components/MovieDetails/Runtime'
import Status from 'src/components/MovieDetails/Status'
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
    handlePopoverMouseEnter,
    handleWatchlistClick,
    isLoading,
    movie,
    popoverOpen,
    sessionId,
    setPopoverOpen,
  } = useContainer()

  if (isLoading) {
    return (
      <div className='container top-margin'>
        <Loading />
      </div>
    )
  } else if (error) {
    return (
      <div className='container top-margin'>
        <Error error={error} />
      </div>
    )
  } else if (!movie) {
    return <Empty description='Movie not found' />
  }

  const title = `${movie.title}${
    movie.release_date ? ` (${format(movie.release_date, 'yyyy')})` : ''
  }`

  return (
    <>
      <Helmet title={metaTitle(title)} />
      {movie.images.backdrops.length > 0 && (
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
          {sessionId && (
            <>
              <Popover
                content={
                  <PopoverContent
                    movieId={movie.id}
                    setPopoverOpen={setPopoverOpen}
                  />
                }
                destroyOnHidden
                onOpenChange={open => setPopoverOpen(open)}
                open={popoverOpen}
                placement='top'
                title='Add movie to list'
                trigger='click'
              >
                <IconButton
                  data-testid='addMovieToListPopover'
                  icon={<PlusCircleOutlined />}
                  onMouseEnter={handlePopoverMouseEnter}
                />
              </Popover>
              <AddToFavoriteButton
                data-testid='addToFavoriteBtn'
                inFavorite={movie.account_states.favorite}
                onClick={handleFavoriteClick}
              />
              <AddToWatchlistButton
                data-testid='addToWatchlistBtn'
                inWatchlist={movie.account_states.watchlist}
                onClick={handleWatchlistClick}
              />
            </>
          )}
        </PageTitle>
        <Row>
          {movie.overview && <Overview overview={movie.overview} />}
          {movie.imdbInfo?.rating?.star && (
            <ImdbRating rating={movie.imdbInfo.rating.star} />
          )}
          {movie.status && <Status status={movie.status} />}
          {movie.original_language && (
            <OriginalLanguage originalLanguage={movie.original_language} />
          )}
          {movie.production_countries.length > 0 && (
            <Countries countries={movie.production_countries} />
          )}
          {movie.runtime !== 0 && <Runtime runtime={movie.runtime} />}
          {movie.budget !== 0 && <Budget budget={movie.budget} />}
          {movie.revenue !== 0 && <Revenue revenue={movie.revenue} />}
          {movie.genres.length > 0 && <Genres genres={movie.genres} />}
          {movie?.imdbInfo?.contentRating && (
            <ContentRating contentRating={movie.imdbInfo.contentRating} />
          )}
          {movie.credits.cast.length > 0 && (
            <>
              <Divider />
              <CastList cast={movie.credits.cast.slice(0, 12)} />
            </>
          )}
          {(movie.credits.cast.length > 0 || movie.credits.crew.length > 0) && (
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
