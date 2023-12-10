import { BookFilled, BookOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { AddToWatchlistButtonProps } from './types'

const AddToWatchlistButton: React.FC<AddToWatchlistButtonProps> = ({
  handleClick,
  inWatchlist,
  ...props
}) => {
  const watchlistIcon = inWatchlist ? <BookFilled /> : <BookOutlined />

  return (
    <Button
      icon={watchlistIcon}
      onClick={handleClick}
      shape='circle'
      type='text'
      {...props}
    />
  )
}

export default AddToWatchlistButton
