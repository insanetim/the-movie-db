import React from 'react'
import { Row, Col, Input } from 'antd'

import { useContainer } from './hook'

const DashboardSearchInput = () => {
  const { selectQuery, handleSearch } = useContainer()

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
          defaultValue={selectQuery}
          onSearch={handleSearch}
        />
      </Col>
    </Row>
  )
}

export default DashboardSearchInput
