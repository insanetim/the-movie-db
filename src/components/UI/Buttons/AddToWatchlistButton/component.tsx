import { BookFilled, BookOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { AddToWatchlistButtonProps } from './types'

const AddToWatchlistButton: React.FC<AddToWatchlistButtonProps> = ({
  inWatchlist,
  ...buttonProps
}) => {
  const icon = inWatchlist ? <BookFilled /> : <BookOutlined />

  return (
    <Button
      icon={icon}
      shape='circle'
      type='text'
      {...buttonProps}
    />
  )
}

export default AddToWatchlistButton
