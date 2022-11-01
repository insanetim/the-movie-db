import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { showModal } from 'src/state/app/actions'
import { fetchLists } from 'src/state/lists/actions'
import { accountSelector } from 'src/state/session/selectors'
import { listsSelector } from 'src/state/lists/selectors'

export const useContainer = () => {
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
    if (R.not(R.isEmpty(account))) {
      dispatch(fetchLists())
    }
  }, [account])

  return { lists, handleClick }
}
