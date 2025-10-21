import { Layout } from 'antd'

import { EmptyLayoutProps } from './types'

const EmptyLayout: React.FC<EmptyLayoutProps> = ({ children }) => (
  <Layout className='center'>
    <Layout.Content className='auth-layout'>{children}</Layout.Content>
  </Layout>
)

export default EmptyLayout
