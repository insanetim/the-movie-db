import { APP_NAME } from 'src/constants/app'

import metaTitle from '../metaTitle'

describe('metaTitle', () => {
  it('returns correct value', () => {
    expect(metaTitle('Title')).toBe(`Title | ${APP_NAME}`)
  })
})
