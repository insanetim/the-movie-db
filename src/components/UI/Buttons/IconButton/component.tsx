import { Button } from 'antd'

import { IconButtonProps } from './types'

const IconButton: React.FC<IconButtonProps> = ({
  handleClick,
  icon,
  ...props
}) => {
  return (
    <Button
      icon={icon}
      onClick={handleClick}
      shape='circle'
      type='text'
      {...props}
    />
  )
}

export default IconButton
