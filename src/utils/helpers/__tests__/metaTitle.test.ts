import { APP_NAME } from 'src/constants'

import metaTitle from '../metaTitle'

describe('metaTitle', () => {
  it('should append app name to title with separator', () => {
    const title = 'Title'
    const result = metaTitle(title)

    expect(result).toBe(`Title | ${APP_NAME}`)
  })
})
