import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { AddToFavoriteButtonProps } from './types'

const AddToFavoriteButton: React.FC<AddToFavoriteButtonProps> = ({
  handleClick,
  inFavorite,
  ...props
}) => {
  const favoriteIcon = inFavorite ? <HeartFilled /> : <HeartOutlined />

  return (
    <Button
      icon={favoriteIcon}
      onClick={handleClick}
      shape='circle'
      type='text'
      {...props}
    />
  )
}

export default AddToFavoriteButton
