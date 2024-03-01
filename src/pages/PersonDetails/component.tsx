import { Button, Col, Divider, Row, Typography } from 'antd'
import { isEmpty, isNil, isNotNil } from 'ramda'
import NoImage from 'src/assets/images/no-image.svg'
import KnownFor from 'src/components/PersonDetails/KnownFor'
import PersonalInfo from 'src/components/PersonDetails/PersonalInfo'
import SocialLinks from 'src/components/PersonDetails/SocialLinks'
import Empty from 'src/components/UI/Empty'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'

import useContainer from './hook'

const PersonDetails = () => {
  const { error, handleGoToCredits, loading, person } = useContainer()

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

  if (isNil(person)) {
    return <Empty description='Person not found' />
  }

  let poster = (
    <div className='person-poster--no-image'>
      <img
        alt={person.name}
        src={NoImage}
      />
    </div>
  )
  if (isNotNil(person.profile_path)) {
    poster = (
      <div className='person-poster'>
        <img
          alt={person.name}
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
        />
      </div>
    )
  }

  return (
    <>
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
              gender={person.gender}
              placeOfBirth={person.place_of_birth}
            />
            {!isEmpty(person.biography) && (
              <>
                <Divider />
                <Typography.Title level={3}>Biography</Typography.Title>
                <Typography.Paragraph>{person.biography}</Typography.Paragraph>
              </>
            )}
          </Col>
          {(!isEmpty(person.movie_credits.cast) ||
            !isEmpty(person.movie_credits.crew)) && (
            <>
              <KnownFor
                credits={person.movie_credits}
                knownForDepartment={person.known_for_department}
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
