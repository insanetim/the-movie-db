import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Layout, Row, Typography } from 'antd'
import { Helmet } from 'react-helmet'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'

const Login: React.FC = () => {
  const { handleLogIn, loading } = useContainer()

  return (
    <>
      <Helmet title={metaTitle('Login')} />
      <div className='center'>
        <Layout>
          <Layout.Content>
            <div className='container'>
              <Row justify='center'>
                <Col
                  lg={8}
                  md={12}
                  span={20}
                  xl={6}
                >
                  <Form
                    autoComplete='off'
                    onFinish={handleLogIn}
                  >
                    <Typography.Title>The Movie DB</Typography.Title>
                    <Form.Item
                      name='username'
                      rules={[{ message: 'Username is required', required: true }]}
                    >
                      <Input
                        placeholder='Username'
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                      />
                    </Form.Item>
                    <Form.Item
                      name='password'
                      rules={[
                        { message: 'Password is required', required: true },
                        { message: 'Password must be at least 4 characters', min: 4 }
                      ]}
                    >
                      <Input
                        placeholder='Password'
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType='submit'
                        loading={loading}
                        type='primary'
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
                      rel='noreferrer'
                      target='_blank'
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
    </>
  )
}

export default Login
