import { Col, Typography } from 'antd'
import ISO6391 from 'iso-639-1'

import { OriginalLanguageProps } from './types'

const OriginalLanguage: React.FC<OriginalLanguageProps> = ({
  originalLanguage,
}) => (
  <Col span={24}>
    <Typography.Paragraph>
      <b>Original Language: </b>
      <span>{ISO6391.getName(originalLanguage)}</span>
    </Typography.Paragraph>
  </Col>
)

export default OriginalLanguage
