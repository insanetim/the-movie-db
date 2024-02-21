import { Col, Typography } from 'antd'

import useContainer from './hook'
import { CountriesProps } from './types'

const Countries: React.FC<CountriesProps> = ({ countries }) => {
  const { formatedCountries, title } = useContainer({ countries })

  return (
    <Col span={24}>
      <Typography.Paragraph>
        <b>{title}: </b>
        <span>{formatedCountries}</span>
      </Typography.Paragraph>
    </Col>
  )
}

export default Countries
