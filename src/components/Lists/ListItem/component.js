import React from 'react'
import PropTypes from 'prop-types'
import { Col, Card, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import { useContainer } from './hook'

const ListItem = ({ list }) => {
  const { handleClick, handleDelete } = useContainer(list.id)

  return (
    <Col
      span={24}
      sm={{ span: 12 }}
      md={{ span: 8 }}
      lg={{ span: 8 }}
      xl={{ span: 6 }}
    >
      <Card
        className='top-margin'
        hoverable
        actions={[
          <DeleteOutlined
            key='delete'
            onClick={handleDelete}
          />
        ]}
        onClick={handleClick}
      >
        <Typography.Title level={4}>{list.name}</Typography.Title>
        {list.description}
      </Card>
    </Col>
  )
}

ListItem.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string
  })
}

ListItem.defaultProps = {
  list: {}
}

export default ListItem
