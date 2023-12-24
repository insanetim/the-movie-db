import Cookies from 'js-cookie'

const getSessionId = () => {
  return Cookies.get('tmdb.session_id') ?? ''
}

export default getSessionId
