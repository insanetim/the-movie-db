import { mockImage } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ImageGallery from '../component'
import { ImageGalleryProps } from '../types'

describe('ImageGallery component', () => {
  it('should match snapshot', () => {
    const props: ImageGalleryProps = {
      images: [mockImage],
      title: 'test/title',
    }

    const { asFragment } = renderWithWrapper(<ImageGallery {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
