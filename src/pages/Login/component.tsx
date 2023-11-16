import { Col, Row, Typography } from 'antd'
import { Helmet } from 'react-helmet'
import LoginForm from 'src/components/LoginForm'
import EmptyLayout from 'src/layouts/Empty/component'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'

const Login: React.FC = () => {
  const { handleLogIn, loading } = useContainer()

  return (
    <>
      <Helmet title={metaTitle('Login')} />
      <EmptyLayout>
        <div className='container'>
          <Row justify='center'>
            <Col
              lg={8}
              md={12}
              span={20}
              xl={6}
            >
              <LoginForm
                isSubmitting={loading}
                onSubmit={handleLogIn}
              />
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
      </EmptyLayout>
    </>
  )
}

export default Login
