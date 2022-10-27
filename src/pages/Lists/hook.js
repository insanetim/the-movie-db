import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

import { showModal } from 'src/state/app/actions'
import { requestLists } from 'src/state/lists/actions'
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
    if (!isEmpty(account)) {
      dispatch(requestLists())
    }
  }, [account])

  return { lists, handleClick }
}
