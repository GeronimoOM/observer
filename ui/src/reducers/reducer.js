import { combineReducers } from 'redux'
import posts from './posts'
import categories from './categories'


const reducer = combineReducers({
  categories,
  posts
})

export default reducer
