import { render } from '@testing-library/react'

import PersonalInfo from '../component'

describe('PersonalInfo component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <PersonalInfo
        birthday='1999-01-01'
        gender={3}
        placeOfBirth='New York, USA'
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
