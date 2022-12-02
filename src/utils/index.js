import { m, h, ms } from 'time-convert'
import { mergeDeepRight } from 'ramda'

export const convertDuration = minutes => {
  const duration = ms.to(h, m)(1000 * 60 * minutes)
  const result = []
  if (duration[0]) result.push(`${duration[0]}h`)
  if (duration[1]) result.push(`${duration[1]}m`)
  return result.join(' ')
}

export const convertMoney = value =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

export const bindId = (array, id) =>
  array.map(action =>
    mergeDeepRight(action, {
      props: {
        onClick: action.props.onClick.bind(null, id)
      }
    })
  )
