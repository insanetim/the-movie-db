import { render } from '@testing-library/react'

import PersonalInfo from '../component'

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

describe('PersonalInfo component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <PersonalInfo
        birthday='1969-01-01'
        gender={3}
        placeOfBirth='New York, USA'
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with other data', () => {
    const { asFragment } = render(
      <PersonalInfo
        birthday='1969-01-01'
        deathday='2010-01-01'
        gender={3}
        placeOfBirth='New York, USA'
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
