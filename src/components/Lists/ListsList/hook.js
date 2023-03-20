import { useDispatch } from 'react-redux'

import { setListsPage } from 'src/store/lists/actions'

const useContainer = () => {
  const dispatch = useDispatch()

  const handlePaginationChange = nextPage => {
    dispatch(setListsPage(nextPage))
  }

  return { handlePaginationChange }
}

export default useContainer
