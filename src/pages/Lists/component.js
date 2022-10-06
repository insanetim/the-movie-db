import React from 'react'
import { Row, Col, Card, Typography, Pagination } from 'antd'
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { range } from 'lodash'

const Lists = () => (
  <>
    <Row justify='center'>
      <Col span={20}>
        <div className='top-margin'>
          <Typography.Title>
            My Lists <PlusCircleOutlined onClick={() => {}} />
          </Typography.Title>
        </div>
      </Col>
    </Row>
    <Row justify='center'>
      <Col span={20}>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32
          }}
        >
          {range(10).map(index => (
            <Col
              key={index}
              span={24}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
            >
              <Card
                hoverable
                className='top-margin'
                actions={[
                  <DeleteOutlined
                    key='delete'
                    onClick={() => {}}
                  />
                ]}
              >
                <Typography.Title level={4}>
                  List name
                  {index}
                </Typography.Title>
                Description
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
    <Row justify='center'>
      <Col>
        <Pagination
          defaultCurrent={1}
          total={50}
          className='pagination'
        />
      </Col>
    </Row>
  </>
)

export default Lists
