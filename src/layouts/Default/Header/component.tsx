import { CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Dropdown, Layout, Row, Typography } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { Link } from 'react-router-dom'
import { APP_NAME } from 'src/constants/app'
import isPresent from 'src/utils/helpers/isPresent'

import useContainer from './hook'

const Header: React.FC = () => {
  const { account, handleLogOut } = useContainer()

  const items: ItemType[] = [
    { key: 'item-1', label: <Link to='/'>Dashboard</Link> },
    { key: 'item-2', type: 'divider' },
    { key: 'item-3', label: <Link to='/lists'>My Lists</Link> },
    { key: 'item-5', label: <Link to='/favorite'>Favorite</Link> },
    { key: 'item-4', label: <Link to='/watchlist'>Watchlist</Link> },
    { key: 'item-6', type: 'divider' },
    { key: 'item-7', label: 'Logout', onClick: handleLogOut },
  ]

  let avatar: JSX.Element
  if (isPresent(account)) {
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

  let username: string
  if (isPresent(account)) {
    username = account.username
  } else {
    username = 'Username'
  }

  return (
    <Layout.Header>
      <Row justify='space-between'>
        <Col>
          <Typography.Text className='logo'>{APP_NAME}</Typography.Text>
        </Col>
        <Col>
          <Dropdown menu={{ items }}>
            <Typography.Text>
              {avatar}
              {` `}
              <span className='hide-sm-down'>{username}</span>
              {` `}
              <CaretDownOutlined />
            </Typography.Text>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
