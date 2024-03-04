import { Col, Typography } from 'antd'

import { ImdbRatingProps } from './types'

const ImdbRating: React.FC<ImdbRatingProps> = ({ rating }) => {
  return (
    <Col span={24}>
      <Typography.Paragraph>
        <b>IMDB Rating: </b>
        <span>{rating}</span>
      </Typography.Paragraph>
    </Col>
  )
}

export default ImdbRating
