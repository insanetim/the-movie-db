import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { not, isEmpty } from 'ramda'

import { showModal } from 'src/state/app/actions'
import { fetchLists } from 'src/state/lists/actions'
import { accountSelector } from 'src/state/session/selectors'
import { listsSelector } from 'src/state/lists/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)
  const lists = useSelector(listsSelector)

  const handleClick = () => {
    dispatch(
      showModal({
        modalType: 'CREATE_LIST_MODAL'
      })
    )
  }

  useEffect(() => {
    if (not(isEmpty(account))) {
      dispatch(fetchLists(1))
    }
  }, [account])

  return { lists, handleClick }
}

export default useContainer
