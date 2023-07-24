import { APP_NAME } from 'src/constants/app'

const metaTitle = (title: string): string => {
  return `${title} | ${APP_NAME}`
}

export default metaTitle
