import React from 'react'
import PropTypes from 'prop-types'
import { Col, Card } from 'antd'

import NoImage from 'src/assets/images/no-image.svg'

const CreditsItem = ({ profilePath, title, description }) => (
  <Col
    xs={{ span: 24 }}
    sm={{ span: 12 }}
    md={{ span: 8 }}
    lg={{ span: 8 }}
    xl={{ span: 6 }}
  >
    <Card
      className='top-margin'
      cover={
        profilePath ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${profilePath}`}
            alt='Profile'
          />
        ) : (
          <div className='ant-card-cover--no-image'>
            <img
              src={NoImage}
              alt=''
            />
          </div>
        )
      }
    >
      <Card.Meta
        title={title}
        description={description}
      />
    </Card>
  </Col>
)

CreditsItem.propTypes = {
  profilePath: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
}

CreditsItem.defaultProps = {
  profilePath: '',
  title: '',
  description: ''
}

export default CreditsItem
