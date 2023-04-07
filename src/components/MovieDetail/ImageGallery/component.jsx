import PropTypes from 'prop-types'
import { Row, Col, Carousel } from 'antd'

const ImageGallery = ({ images }) => (
  <Row>
    <Col span={24}>
      <Carousel autoplay>
        {images.map(image => (
          <div
            key={image.file_path}
            className='movie-image'
          >
            <img
              src={`https://image.tmdb.org/t/p/original${image.file_path}`}
              alt=''
            />
          </div>
        ))}
      </Carousel>
    </Col>
  </Row>
)

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      file_path: PropTypes.string
    })
  )
}

ImageGallery.defaultProps = {
  images: []
}

export default ImageGallery
