import { Layout } from 'antd'

import { EmptyLayoutProps } from './types'

const EmptyLayout: React.FC<EmptyLayoutProps> = ({ children }) => (
  <Layout className='full-height'>
    <Layout.Content className='auth-layout'>{children}</Layout.Content>
  </Layout>
)

export default EmptyLayout
