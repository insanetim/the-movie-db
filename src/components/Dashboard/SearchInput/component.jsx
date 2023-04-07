import PropTypes from 'prop-types'
import { Row, Col, Input } from 'antd'

import useContainer from './hook'

const SearchInput = ({ searchQuery }) => {
  const { currentValue, handleChange, handleSearch } = useContainer({ searchQuery })

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

SearchInput.propTypes = {
  searchQuery: PropTypes.string
}

SearchInput.defaultProps = {
  searchQuery: null
}

export default SearchInput
