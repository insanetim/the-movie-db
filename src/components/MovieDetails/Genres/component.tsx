import { Col, Flex, Tag, Typography } from 'antd'

import { GenresProps } from './types'

const Genres: React.FC<GenresProps> = ({ genres }) => (
  <Col span={24}>
    <Typography.Paragraph>
      <b>Genres: </b>
      <Flex
        gap={4}
        style={{ display: 'inline-flex' }}
      >
        {genres.map(({ id, name }) => (
          <Tag key={id}>{name.toUpperCase()}</Tag>
        ))}
      </Flex>
    </Typography.Paragraph>
  </Col>
)

export default Genres
