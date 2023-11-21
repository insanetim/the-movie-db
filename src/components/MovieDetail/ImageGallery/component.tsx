import { Carousel, Col, Row } from 'antd'

import { ImageGalleryProps } from './types'

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => (
  <Row>
    <Col span={24}>
      <Carousel autoplay>
        {images.map(image => (
          <div
            className='movie-image'
            key={image.file_path}
          >
            <img
              alt={title}
              src={`https://image.tmdb.org/t/p/original${image.file_path}`}
            />
          </div>
        ))}
      </Carousel>
    </Col>
  </Row>
)

export default ImageGallery
