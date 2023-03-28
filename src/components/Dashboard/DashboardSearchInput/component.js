import PropTypes from 'prop-types'
import { Row, Col, Input } from 'antd'

import useContainer from './hook'

const DashboardSearchInput = ({ searchQuery }) => {
  const { currentValue, handleChange, handleSearch } = useContainer(searchQuery)

  return (
    <Row justify='center'>
      <Col
        span={24}
        md={14}
        lg={12}
        xl={10}
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
