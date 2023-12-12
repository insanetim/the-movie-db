import { Col, Tag, Typography } from 'antd'

import { GenresProps } from './types'

const Genres: React.FC<GenresProps> = ({ genres }) => {
  return (
    <Col span={24}>
      <Typography.Paragraph>
        <b>Genres: </b>
        {genres.map(({ id, name }) => (
          <Tag key={id}>{name.toUpperCase()}</Tag>
        ))}
      </Typography.Paragraph>
    </Col>
  )
}

export default Genres
