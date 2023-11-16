import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'

const DefaultLayout: React.FC = () => (
  <Layout>
    <Header />
    <Layout.Content>
      <Outlet />
    </Layout.Content>
    <Footer />
  </Layout>
)

export default DefaultLayout
