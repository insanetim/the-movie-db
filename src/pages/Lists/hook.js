import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

import { requestLists, showModal } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(state => state.account)
  const lists = useSelector(state => state.lists)

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
