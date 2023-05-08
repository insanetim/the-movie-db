import { Row, Col, Input } from 'antd'

import type { SearchInputProps } from './types'
import useContainer from './hook'

const SearchInput: React.FC<SearchInputProps> = ({ query }) => {
  const { currentValue, handleChange, handleSearch } = useContainer({ query })

  return (
    <Row
      className='top-margin'
      justify='center'
    >
      <Col
        span={24}
        md={14}
        lg={12}
        xl={10}
      >
        <Input.Search
          placeholder='Enter movie name'
          size='large'
          enterButton='Search'
          allowClear
          value={currentValue}
          onChange={handleChange}
          onSearch={handleSearch}
        />
      </Col>
    </Row>
  )
}

export default SearchInput
