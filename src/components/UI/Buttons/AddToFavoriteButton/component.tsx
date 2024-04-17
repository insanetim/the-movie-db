import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { AddToFavoriteButtonProps } from './types'

const AddToFavoriteButton: React.FC<AddToFavoriteButtonProps> = ({
  inFavorite,
  ...buttonProps
}) => {
  const icon = inFavorite ? <HeartFilled /> : <HeartOutlined />

  return (
    <Button
      icon={icon}
      shape='circle'
      type='text'
      {...buttonProps}
    />
  )
}

export default AddToFavoriteButton
