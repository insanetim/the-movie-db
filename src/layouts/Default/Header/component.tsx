import { CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Dropdown, Layout, MenuProps, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import ThemeSwitch from 'src/components/ThemeSwitch'
import { APP_NAME } from 'src/constants/app'

import useContainer from './hook'

const Header: React.FC = () => {
  const { account, handleLogIn, handleLogOut, isAuthenticated } = useContainer()

  const items: MenuProps['items'] = [
    { key: 'item-1', label: <Link to='/'>Dashboard</Link> },
    { key: 'item-2', type: 'divider' },
    { key: 'item-3', label: <Link to='/lists'>My Lists</Link> },
    { key: 'item-4', label: <Link to='/favorite'>Favorite</Link> },
    { key: 'item-5', label: <Link to='/watchlist'>Watchlist</Link> },
    { key: 'item-6', type: 'divider' },
    { key: 'item-7', label: 'Sign out', onClick: handleLogOut },
  ]

  let avatar: JSX.Element
  if (account) {
    const url = account.avatar.tmdb.avatar_path
      ? `https://www.themoviedb.org/t/p/w32_and_h32_face${account.avatar.tmdb.avatar_path}`
      : `https://www.gravatar.com/avatar/${account.avatar.gravatar.hash}`
    avatar = (
      <Avatar
        alt='User avatar'
        src={url}
      />
    )
  } else {
    avatar = <Avatar icon={<UserOutlined />} />
  }

  const username = account?.username ? account.username : 'Username'

  return (
    <Layout.Header>
      <Row justify='space-between'>
        <Col>
          <Link
            className='logo text-white'
            to='/'
          >
            {APP_NAME}
          </Link>
        </Col>
        <Col>
          <Row gutter={24}>
            <Col>
              <ThemeSwitch />
            </Col>
            <Col>
              {isAuthenticated ? (
                <Dropdown menu={{ items }}>
                  <Typography.Text>
                    {avatar}
                    {` `}
                    <span className='hide-sm-down'>{username}</span>
                    {` `}
                    <CaretDownOutlined />
                  </Typography.Text>
                </Dropdown>
              ) : (
                <Typography.Link
                  className='text-white'
                  onClick={handleLogIn}
                >
                  Sign in
                </Typography.Link>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
