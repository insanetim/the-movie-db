import React from 'react'
import { Row, Col, Typography, Tag, Popover } from 'antd'
import Icon, { HeartOutlined, HeartFilled, BookOutlined, BookFilled, PlusCircleOutlined } from '@ant-design/icons'
import { upperCase } from 'lodash'
import { format } from 'date-fns'
import ISO6391 from 'iso-639-1'

import Loading from 'src/components/Loading'
import CreditsItem from 'src/components/Movie/CreditsItem'
import ImageGallery from 'src/components/Movie/ImageGallery'
import PopoverContent from 'src/components/Movie/PopoverContent'
import { convertDuration, convertMoney } from 'src/utils'
import { useContainer } from './hook'

const Movie = () => {
  const {
    movie,
    movieInFavorite,
    movieInWatchlist,
    loading,
    handleFavoriteClick,
    handleWatchlistClick,
    popoverOpen,
    setPopoverOpen
  } = useContainer()

  if (loading) {
    return (
      <div className='top-margin'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      {movie.images.length > 0 && <ImageGallery images={movie.images} />}
      <div className='top-margin'>
        <Row justify='center'>
          <Col span={20}>
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
                <PlusCircleOutlined />
              </Popover>{' '}
              <Icon
                component={movieInFavorite ? HeartFilled : HeartOutlined}
                onClick={handleFavoriteClick}
              />{' '}
              <Icon
                component={movieInWatchlist ? BookFilled : BookOutlined}
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
        </Row>
        <Row justify='center'>
          <Col span={20}>
            <Typography.Paragraph>
              <b>Original Language: </b>
              <span>{ISO6391.getName(movie.original_language)}</span>
            </Typography.Paragraph>
          </Col>
          {movie.runtime !== 0 && (
            <Col span={20}>
              <Typography.Paragraph>
                <b>Runtime: </b>
                <span>{convertDuration(movie.runtime)}</span>
              </Typography.Paragraph>
            </Col>
          )}
          {movie.budget !== 0 && (
            <Col span={20}>
              <Typography.Paragraph>
                <b>Budget: </b>
                <span>{convertMoney(movie.budget)}</span>
              </Typography.Paragraph>
            </Col>
          )}
          {movie.revenue !== 0 && (
            <Col span={20}>
              <Typography.Paragraph>
                <b>Revenue: </b>
                <span>{convertMoney(movie.revenue)}</span>
              </Typography.Paragraph>
            </Col>
          )}
          {movie.genres.length > 0 && (
            <Col span={20}>
              <Typography.Paragraph>
                <b>Genres: </b>
                {movie.genres.map(({ id, name }) => (
                  <Tag key={id}>{upperCase(name)}</Tag>
                ))}
              </Typography.Paragraph>
            </Col>
          )}
        </Row>
        {movie.credits.cast.length > 0 && (
          <>
            <Row>
              <Col
                className='top-margin'
                span={10}
                offset={2}
              >
                <Typography.Title level={3}>Casts</Typography.Title>
              </Col>
            </Row>
            <Row
              gutter={8}
              justify='center'
            >
              <Col span={20}>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32
                  }}
                >
                  {movie.credits.cast.slice(0, 12).map(item => (
                    <CreditsItem
                      key={item.credit_id}
                      profilePath={item.profile_path}
                      title={item.name}
                      description={item.character}
                    />
                  ))}
                </Row>
              </Col>
            </Row>
          </>
        )}
        {movie.credits.crew.length > 0 && (
          <>
            <Row>
              <Col
                className='top-margin'
                span={10}
                offset={2}
              >
                <Typography.Title level={3}>Crew</Typography.Title>
              </Col>
            </Row>
            <Row
              gutter={8}
              justify='center'
            >
              <Col span={20}>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32
                  }}
                >
                  {movie.credits.crew.slice(0, 12).map(item => (
                    <CreditsItem
                      key={item.credit_id}
                      profilePath={item.profile_path}
                      title={item.name}
                      description={item.job}
                    />
                  ))}
                </Row>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  )
}

export default Movie
