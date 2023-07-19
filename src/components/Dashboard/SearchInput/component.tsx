import { Col, Input, Row } from 'antd'

import type { SearchInputProps } from './types'

import useContainer from './hook'

const SearchInput: React.FC<SearchInputProps> = ({ query }) => {
  const { handleSearch } = useContainer()

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
          defaultValue={query}
          enterButton='Search'
          onSearch={handleSearch}
          placeholder='Enter movie name'
          size='large'
        />
      </Col>
    </Row>
  )
}

export default SearchInput
