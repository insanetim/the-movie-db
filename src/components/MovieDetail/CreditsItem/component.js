import PropTypes from 'prop-types'
import { Card } from 'antd'

import NoImage from 'src/assets/images/no-image.svg'

const CreditsItem = ({ profilePath, title, description }) => (
  <Card
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
