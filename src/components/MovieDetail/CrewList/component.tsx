import { Row, Col, Typography } from 'antd'

import type { CrewListProps } from './types'
import CreditsItem from '../CreditsItem'

const CrewList: React.FC<CrewListProps> = ({ crew }) => (
  <>
    <Col span={24}>
      <Typography.Title level={3}>Crew</Typography.Title>
    </Col>
    <Col span={24}>
      <Row gutter={[24, 16]}>
        {crew.map(item => (
          <Col
            key={item.credit_id}
            span={24}
            sm={12}
            md={8}
            lg={8}
            xl={6}
          >
            <CreditsItem
              profilePath={item.profile_path}
              title={item.name}
              description={item.job}
            />
          </Col>
        ))}
      </Row>
    </Col>
  </>
)

export default CrewList