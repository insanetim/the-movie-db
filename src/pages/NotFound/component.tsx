import { Col, Row, Typography } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import metaTitle from 'src/utils/helpers/metaTitle'

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet title={metaTitle('Page Not Found')} />
      <div className='container'>
        <Row justify='center'>
          <Col
            md={22}
            span={24}
            xl={20}
          >
            <Typography.Title
              className='error-title'
              level={2}
            >
              Oops! We can't find the page you're looking for.
            </Typography.Title>
          </Col>
          <Col
            md={22}
            span={24}
            xl={20}
          >
            <Typography.Paragraph>
              Please check that the Web site address is spelled correctly or go to <Link to='/'>home page</Link>.
            </Typography.Paragraph>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default NotFound
