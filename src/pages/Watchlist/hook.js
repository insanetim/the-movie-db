import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { isEmpty } from 'lodash'
import { requestWatchlist } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(state => state.account)
  const watchlist = useSelector(state => state.watchlist)

  const handlePagination = page => {
    dispatch(requestWatchlist(page))
  }

  const handleDelete = event => {
    event.stopPropagation()
    Modal.confirm({
      title: 'Do you want to delete movie from watchlist?',
      onOk() {}
    })
  }

  useEffect(() => {
    if (!isEmpty(account) && isEmpty(watchlist)) {
      dispatch(requestWatchlist())
    }
  }, [account])

  return { watchlist, handlePagination, handleDelete }
}
