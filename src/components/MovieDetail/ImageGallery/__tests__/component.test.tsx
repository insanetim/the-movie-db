import { render } from '@testing-library/react'
import { mockImage } from 'src/__mocks__/mockMovie'

import ImageGallery from '../component'
import { ImageGalleryProps } from '../types'

describe('ImageGallery component', () => {
  it('should match snapshot', () => {
    const props: ImageGalleryProps = {
      images: [mockImage],
      title: 'test/title'
    }
    const { asFragment } = render(<ImageGallery {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
