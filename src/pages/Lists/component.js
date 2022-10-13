import React from 'react'
import { Row, Col, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'

import ListsContent from 'src/components/Lists/ListsContent'
import Loading from 'src/components/Loading'
import { useContainer } from './hook'

const Lists = () => {
  const { lists, handleClick } = useContainer()

  return (
    <>
      <Row justify='center'>
        <Col span={20}>
          <div className='top-margin'>
            <Typography.Title>
              My Lists <PlusCircleOutlined onClick={handleClick} />
            </Typography.Title>
          </div>
        </Col>
      </Row>
      {isEmpty(lists) ? <Loading /> : <ListsContent lists={lists} />}
    </>
  )
}

export default Lists
