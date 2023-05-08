import { Row, Col, Carousel } from 'antd'

import type { ImageGalleryProps } from './types'

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => (
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
              alt={title}
            />
          </div>
        ))}
      </Carousel>
    </Col>
  </Row>
)

export default ImageGallery
