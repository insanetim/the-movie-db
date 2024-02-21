import { Col, Row, Typography } from 'antd'

import CreditsItem from '../CreditsItem'
import useContainer from './hook'
import { CrewListProps } from './types'

const CrewList: React.FC<CrewListProps> = ({ crew }) => {
  const { groupedCrew } = useContainer({ crew })

  return (
    <>
      <Col span={24}>
        <Typography.Title level={3}>
          Crew <span className='total-count'>{`(${crew.length})`}</span>
        </Typography.Title>
      </Col>
      {groupedCrew.groupNames.map(groupName => (
        <Col
          className='crew-group'
          key={groupName}
          span={24}
        >
          <Typography.Title level={4}>{groupName}</Typography.Title>
          <Row gutter={[24, 16]}>
            {groupedCrew[groupName]?.map(item => (
              <Col
                key={item.credit_id}
                lg={8}
                md={8}
                sm={12}
                span={24}
                xl={6}
              >
                <CreditsItem
                  description={item.job}
                  id={item.id}
                  profilePath={item.profile_path}
                  title={item.name}
                />
              </Col>
            ))}
          </Row>
        </Col>
      ))}
    </>
  )
}

export default CrewList
