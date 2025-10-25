import { screen } from '@testing-library/react'
import { mockImage } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ImageGallery from '../component'
import { ImageGalleryProps } from '../types'

describe('ImageGallery component', () => {
  const renderGallery = (override?: Partial<ImageGalleryProps>) =>
    renderWithWrapper(
      <ImageGallery
        images={[mockImage]}
        title='test/title'
        {...override}
      />
    )

  it('renders gallery title and images', () => {
    renderGallery()

    const image = screen.getByAltText('test/title') as HTMLImageElement

    expect(image.src).toContain(mockImage.file_path)
  })

  it('renders empty state when no images provided', () => {
    renderGallery({ images: [] })

    expect(screen.queryByAltText('test/title')).not.toBeInTheDocument()
  })
})
