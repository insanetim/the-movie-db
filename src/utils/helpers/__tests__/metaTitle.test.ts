import { APP_NAME } from 'src/constants'

import metaTitle from '../metaTitle'

describe('metaTitle', () => {
  it('should return correct value', () => {
    const result = metaTitle('Title')

    expect(result).toBe(`Title | ${APP_NAME}`)
  })
})
