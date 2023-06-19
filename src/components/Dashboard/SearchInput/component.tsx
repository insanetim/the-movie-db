import { Col, Input, Row } from 'antd'

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
          value={currentValue}
        />
      </Col>
    </Row>
  )
}

export default SearchInput
