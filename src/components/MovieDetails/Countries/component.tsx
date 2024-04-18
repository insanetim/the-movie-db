import { Col, Typography } from 'antd'

import useContainer from './hook'
import { CountriesProps } from './types'

const Countries: React.FC<CountriesProps> = ({ countries }) => {
  const { formattedCountries, pluralizedTitle } = useContainer({ countries })

  return (
    <Col span={24}>
      <Typography.Paragraph>
        <b>{pluralizedTitle}: </b>
        <span>{formattedCountries}</span>
      </Typography.Paragraph>
    </Col>
  )
}

export default Countries
