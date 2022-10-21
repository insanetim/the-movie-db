import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input } from 'antd'

import { useContainer } from './hook'

const DashboardSearchInput = ({ searchQuery, setSearch }) => {
  const { handleSearch } = useContainer(setSearch)

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
          defaultValue={searchQuery}
          onSearch={handleSearch}
        />
      </Col>
    </Row>
  )
}

DashboardSearchInput.propTypes = {
  searchQuery: PropTypes.string,
  setSearch: PropTypes.func.isRequired
}

DashboardSearchInput.defaultProps = {
  searchQuery: ''
}

export default DashboardSearchInput
