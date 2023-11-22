import { render } from '@testing-library/react'
import { mockCrew } from 'src/__mocks__/mockMovie'

import CrewList from '../component'

describe('CrewList component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<CrewList crew={[mockCrew]} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
