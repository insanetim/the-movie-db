import { Layout } from 'antd'

const EmptyLayout: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => {
  return (
    <div className='center'>
      <Layout>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </div>
  )
}

export default EmptyLayout
