import { render } from '@testing-library/react'

import CrewList from '../component'

describe('CrewList component', () => {
  const mockedCrew = [
    {
      credit_id: '123',
      profile_path: 'test/image',
      name: 'text/name',
      job: 'test/job'
    },
    {
      credit_id: '321',
      profile_path: 'test/image',
      name: 'text/name',
      job: 'test/job'
    }
  ]
  it('matches snapshot', () => {
    const { asFragment } = render(<CrewList crew={mockedCrew} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
