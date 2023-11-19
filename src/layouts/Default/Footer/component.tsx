import { Layout, Typography } from 'antd'

const Footer: React.FC = () => {
  return (
    <Layout.Footer>
      <span style={{ opacity: 0.8 }}>
        Made with ❤ by{' '}
        <Typography.Link
          href='https://github.com/insanetim/frontend-internship'
          rel='noreferrer'
          target='_blank'
        >
          insanetim
        </Typography.Link>
      </span>
    </Layout.Footer>
  )
}

export default Footer