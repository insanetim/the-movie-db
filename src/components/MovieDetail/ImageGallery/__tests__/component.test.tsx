import { render } from '@testing-library/react'
import { mockImage } from 'src/__mocks__/mockMovie'

import type { ImageGalleryProps } from '../types'

import ImageGallery from '../component'

describe('ImageGallery component', () => {
  it('matches snapshot', () => {
    const props: ImageGalleryProps = {
      images: [mockImage],
      title: 'test/title'
    }
    const { asFragment } = render(<ImageGallery {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
