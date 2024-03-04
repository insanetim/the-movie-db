import { Col, Tag, Typography } from 'antd'

import { ContentRatingProps } from './types'

const ContentRating: React.FC<ContentRatingProps> = ({ contentRating }) => {
  return (
    <Col span={24}>
      <Typography.Paragraph>
        <b>Rating: </b>
        <Tag>{contentRating}</Tag>
      </Typography.Paragraph>
    </Col>
  )
}

export default ContentRating
