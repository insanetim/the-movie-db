import { Col, Typography } from 'antd'
import IMDBLogo from 'src/assets/images/imdb.svg'

import { ImdbRatingProps } from './types'

const ImdbRating: React.FC<ImdbRatingProps> = ({ rating }) => {
  return (
    <Col span={24}>
      <Typography.Paragraph>
        <img
          alt='imdb'
          height={24}
          src={IMDBLogo}
          title='imdb rating'
        />
        <b> : </b>
        <span>{rating}</span>
      </Typography.Paragraph>
    </Col>
  )
}

export default ImdbRating
