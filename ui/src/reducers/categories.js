import { handleAction } from 'redux-actions'
import { fetchCategoriesSucc } from  '../actions/categories'

const defaultState = []

const reducer = handleAction(
  fetchCategoriesSucc, 
  (state, { payload: { categories } }) => categories,
  defaultState
)

export default reducer
