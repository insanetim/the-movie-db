import Cookies from 'js-cookie'

const getSessionId = () => Cookies.get('tmdb.session_id') || ''

export default getSessionId
