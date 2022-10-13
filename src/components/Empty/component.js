import React from 'react'
import PropTypes from 'prop-types'
import { Empty as AntdEmpty } from 'antd'

const Empty = ({ description }) => (
  <AntdEmpty
    description={description}
    image={AntdEmpty.PRESENTED_IMAGE_SIMPLE}
  />
)

Empty.propTypes = {
  description: PropTypes.string.isRequired
}

export default Empty
