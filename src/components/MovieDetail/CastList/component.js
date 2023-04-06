import PropTypes from 'prop-types'
import { Row, Col, Typography } from 'antd'

import CreditsItem from '../CreditsItem'

const CastList = ({ cast }) => (
  <>
    <Col span={24}>
      <Typography.Title level={3}>Cast</Typography.Title>
    </Col>
    <Col span={24}>
      <Row gutter={[24, 16]}>
        {cast.map(item => (
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
              description={item.character}
            />
          </Col>
        ))}
      </Row>
    </Col>
  </>
)

CastList.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      credit_id: PropTypes.string,
      profile_path: PropTypes.string,
      name: PropTypes.string,
      character: PropTypes.string
    })
  ).isRequired
}

export default CastList
