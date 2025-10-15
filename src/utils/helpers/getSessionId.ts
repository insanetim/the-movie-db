import Cookies from 'js-cookie'
import { SESSION_COOKIE_NAME } from 'src/constants/app'

const getSessionId = () => Cookies.get(SESSION_COOKIE_NAME) || ''

export default getSessionId
