import { Layout } from 'antd'

import { EmptyLayoutProps } from './types'

const EmptyLayout: React.FC<EmptyLayoutProps> = ({ children }) => {
  return (
    <div className='center'>
      <Layout>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </div>
  )
}

export default EmptyLayout
