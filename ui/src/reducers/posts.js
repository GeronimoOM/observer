import { handleActions } from 'redux-actions'
import { fetchPostsReq, fetchPostsSucc, fetchPostsErr } from  '../actions/posts'


const defaultState = {
  items: [],
  fetching: false
}

const reducer = handleActions(
  new Map([
    [fetchPostsReq, (state) => ({ ...state, fetching: true })],
    [fetchPostsSucc, (state, { payload: { posts } }) => ({ fetching: false, items: posts })], 
    [fetchPostsErr, (state) => ({ ...state, fetching: false })],
  ]), 
  defaultState
)

export default reducer
