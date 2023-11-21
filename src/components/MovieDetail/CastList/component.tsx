import { Col, Row, Typography } from 'antd'

import CreditsItem from '../CreditsItem'
import { CastListProps } from './type'

const CastList: React.FC<CastListProps> = ({ cast }) => (
  <>
    <Col span={24}>
      <Typography.Title level={3}>Cast</Typography.Title>
    </Col>
    <Col span={24}>
      <Row gutter={[24, 16]}>
        {cast.map(item => (
          <Col
            key={item.credit_id}
            lg={8}
            md={8}
            sm={12}
            span={24}
            xl={6}
          >
            <CreditsItem
              description={item.character}
              profilePath={item.profile_path}
              title={item.name}
            />
          </Col>
        ))}
      </Row>
    </Col>
  </>
)

export default CastList
