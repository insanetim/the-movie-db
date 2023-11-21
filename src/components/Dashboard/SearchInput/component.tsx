import { Col, Input, Row } from 'antd'

import useContainer from './hook'
import { SearchInputProps } from './types'

const SearchInput: React.FC<SearchInputProps> = ({ query }) => {
  const { handleChange, handleSearch, inputValue } = useContainer({ query })

  return (
    <Row
      className='top-margin'
      justify='center'
    >
      <Col
        lg={12}
        md={14}
        span={24}
        xl={10}
      >
        <Input.Search
          allowClear
          enterButton='Search'
          onChange={handleChange}
          onSearch={handleSearch}
          placeholder='Enter movie name'
          size='large'
          value={inputValue}
        />
      </Col>
    </Row>
  )
}

export default SearchInput
