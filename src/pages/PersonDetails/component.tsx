import { Button, Col, Divider, Row, Typography } from 'antd'
import { Helmet } from 'react-helmet'
import NoImage from 'src/assets/images/no-image.svg'
import KnownFor from 'src/components/PersonDetails/KnownFor'
import PersonalInfo from 'src/components/PersonDetails/PersonalInfo'
import SocialLinks from 'src/components/PersonDetails/SocialLinks'
import Empty from 'src/components/UI/Empty'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'

const PersonDetails = () => {
  const { error, handleGoToCredits, loading, person } = useContainer()

  if (loading) {
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
  } else if (!person) {
    return <Empty description='Person not found' />
  }

  let poster: JSX.Element
  if (person.profile_path) {
    poster = (
      <div className='person-poster'>
        <img
          alt={person.name}
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
        />
      </div>
    )
  } else {
    poster = (
      <div className='person-poster--no-image'>
        <img
          alt={person.name}
          src={NoImage}
        />
      </div>
    )
  }

  return (
    <>
      <Helmet title={metaTitle(person.name)} />
      <div className='container top-margin'>
        <PageTitle>
          <Typography.Title
            level={1}
            style={{ marginBottom: 0 }}
          >
            {person.name}
          </Typography.Title>
        </PageTitle>
        <Row gutter={24}>
          <Col
            md={8}
            xs={24}
          >
            {poster}
            <SocialLinks externalIds={person.external_ids} />
          </Col>
          <Col
            md={16}
            xs={24}
          >
            <PersonalInfo
              birthday={person.birthday}
              deathday={person.deathday}
              gender={person.gender}
              placeOfBirth={person.place_of_birth}
            />
            {person.biography && (
              <>
                <Divider />
                <Typography.Title level={3}>Biography</Typography.Title>
                <Typography.Paragraph>{person.biography}</Typography.Paragraph>
              </>
            )}
          </Col>
          {(person.movie_credits.cast.length > 0 ||
            person.movie_credits.crew.length > 0) && (
            <>
              <KnownFor
                credits={person.movie_credits}
                department={person.known_for_department}
              />
              <Col
                className='top-margin text-center'
                span={24}
              >
                <Button
                  ghost
                  onClick={handleGoToCredits}
                  type='primary'
                >
                  Show all credits
                </Button>
              </Col>
            </>
          )}
        </Row>
      </div>
    </>
  )
}

export default PersonDetails
