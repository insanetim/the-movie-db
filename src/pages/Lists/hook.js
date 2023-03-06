import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { not, isEmpty } from 'ramda'

import { showModal } from 'src/state/app/actions'
import { fetchLists } from 'src/state/lists/actions'
import { accountSelector } from 'src/state/session/selectors'
import { listsSelector, listsPageSelector, listsLoadingSelector, listsErrorSelector } from 'src/state/lists/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)
  const lists = useSelector(listsSelector)
  const page = useSelector(listsPageSelector)
  const loading = useSelector(listsLoadingSelector)
  const error = useSelector(listsErrorSelector)

  const handleClick = () => {
    dispatch(
      showModal({
        modalType: 'CREATE_LIST_MODAL'
      })
    )
  }

  useEffect(() => {
    if (not(isEmpty(account))) {
      dispatch(fetchLists(page))
    }
  }, [account, page])

  return { lists, loading, error, handleClick }
}

export default useContainer
