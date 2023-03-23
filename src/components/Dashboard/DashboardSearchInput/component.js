import PropTypes from 'prop-types'
import { Row, Col, Input } from 'antd'

import useContainer from './hook'

const DashboardSearchInput = ({ searchQuery }) => {
  const { currentValue, handleChange, handleSearch } = useContainer(searchQuery)

  return (
    <Row
      justify='center'
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 22
      }}
    >
      <Col
        xs={{ span: 20 }}
        sm={{ span: 20 }}
        md={{ span: 14 }}
        lg={{ span: 12 }}
        xl={{ span: 10 }}
      >
        <Input.Search
          className='top-margin'
          placeholder='Enter movie name'
          size='large'
          enterButton='Search'
          allowClear
          value={currentValue}
          onChange={handleChange}
          onSearch={handleSearch}
        />
      </Col>
    </Row>
  )
}

DashboardSearchInput.propTypes = {
  searchQuery: PropTypes.string
}

DashboardSearchInput.defaultProps = {
  searchQuery: null
}

export default DashboardSearchInput
