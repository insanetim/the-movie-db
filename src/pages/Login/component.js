import React from 'react'
import { Button, Col, Form, Input, Layout, Row, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import useContainer from './hook'

const Login = () => {
  const { handleLogin, loading } = useContainer()

  return (
    <div className='center'>
      <Layout>
        <Layout.Content>
          <Row justify='center'>
            <Col>
              <Form
                onFinish={handleLogin}
                autoComplete='off'
              >
                <Typography.Title>The Movie DB</Typography.Title>
                <Form.Item
                  name='username'
                  rules={[{ required: true, message: 'Username is required' }]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='Username'
                  />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[
                    { required: true, message: 'Password is required' },
                    { min: 4, message: 'Password must be at least 4 characters' }
                  ]}
                >
                  <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type='password'
                    placeholder='Password'
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={loading}
                    type='primary'
                    htmlType='submit'
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default Login
