import { render } from '@testing-library/react'

import ImageGallery from '../component'

describe('ImageGallery component', () => {
  it('matches snapshot', () => {
    const mockedImages = [
      {
        file_path: 'test/image'
      }
    ]
    const { asFragment } = render(<ImageGallery images={mockedImages} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
