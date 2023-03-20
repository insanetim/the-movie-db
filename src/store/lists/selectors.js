import { path } from 'ramda'

export const listsSelector = path(['lists', 'lists', 'lists'])
export const listsPageSelector = path(['lists', 'lists', 'page'])
export const listsLoadingSelector = path(['lists', 'lists', 'loading'])
export const listsErrorSelector = path(['lists', 'lists', 'error'])
export const listSelector = path(['lists', 'list', 'list'])
export const listLoadingSelector = path(['lists', 'list', 'loading'])
export const listErrorSelector = path(['lists', 'list', 'error'])
