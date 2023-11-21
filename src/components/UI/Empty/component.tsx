import { Empty as AntdEmpty } from 'antd'

import { EmptyProps } from './types'

const Empty: React.FC<EmptyProps> = ({ description = 'No results' }) => (
  <AntdEmpty
    description={description}
    image={AntdEmpty.PRESENTED_IMAGE_SIMPLE}
  />
)

export default Empty
