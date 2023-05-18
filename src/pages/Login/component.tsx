import { Button, Col, Form, Input, Layout, Row, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import useContainer from './hook'

const Login: React.FC = () => {
  const { loading, handleLogIn } = useContainer()

  return (
    <div className='center'>
      <Layout>
        <Layout.Content>
          <div className='container'>
            <Row justify='center'>
              <Col
                span={20}
                md={12}
                lg={8}
                xl={6}
              >
                <Form
                  onFinish={handleLogIn}
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
                      type='primary'
                      htmlType='submit'
                      loading={loading}
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={24}>
                <p className='text-center'>
                  Don&apos;t have The Movie Database account?{' '}
                  <Typography.Link
                    href='https://www.themoviedb.org/signup'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Sign up.
                  </Typography.Link>
                </p>
              </Col>
            </Row>
          </div>
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default Login
