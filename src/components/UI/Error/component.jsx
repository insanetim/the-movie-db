import PropTypes from 'prop-types'
import { Result } from 'antd'
import { path } from 'ramda'

const Error = ({ error }) => {
  const title = path(['message'], error)
  const subTitle = path(['response', 'data', 'status_message'], error)

  return (
    <Result
      status='error'
      title={title}
      subTitle={subTitle}
    />
  )
}

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    response: PropTypes.shape({
      data: PropTypes.shape({
        status_message: PropTypes.string
      })
    })
  })
}

Error.defaultProps = {
  error: null
}

export default Error
