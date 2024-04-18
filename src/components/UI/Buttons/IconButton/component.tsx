import { Button } from 'antd'

import { IconButtonProps } from './types'

const IconButton: React.FC<IconButtonProps> = ({ icon, ...rest }) => (
  <Button
    icon={icon}
    shape='circle'
    type='text'
    {...rest}
  />
)

export default IconButton
