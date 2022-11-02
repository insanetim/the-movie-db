import { shallow } from 'enzyme'

import ImageGallery from '../component'

it('matches snapshot', () => {
  const mockedImages = [
    {
      file_path: 'test/image'
    }
  ]
  const component = shallow(<ImageGallery images={mockedImages} />)

  expect(component).toMatchSnapshot()
})
