import { render } from '@testing-library/react'

import CastList from '../component'

describe('CastList component', () => {
  const mockedCast = [
    {
      credit_id: '123',
      profile_path: 'test/image',
      name: 'text/name',
      character: 'test/character'
    },
    {
      credit_id: '321',
      profile_path: 'test/image',
      name: 'text/name',
      character: 'test/character'
    }
  ]
  it('matches snapshot', () => {
    const { asFragment } = render(<CastList cast={mockedCast} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
