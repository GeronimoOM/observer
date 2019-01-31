import { combineReducers } from 'redux'
import { combineActions, handleAction, handleActions } from 'redux-actions'
import { fetchPostsReq, fetchPostsSucc, fetchPostsErr } from  '../actions/posts'
import { PostFlags, PostTypes } from '../common/posts'
import { categories } from '../common/categories'
import { Elems } from '../config/api'

const defaultMaps = {
  byFlag: defaultMap(Object.values(PostFlags)),
  byType: defaultMap(Object.values(PostTypes)),
  byCategory: defaultMap(categories.map(c => c.id)),
  byQuery: defaultIds()
}

function defaultMap(keys) {
  return Object.assign({}, ...keys.map(key => ({ [key]: defaultIds() })))
}

function defaultIds() {
  return { ids: [], fetching: false, hasMore: true }
}

const entities = handleAction(
  fetchPostsSucc, 
  (entities, { payload: { posts } }) => Object.assign({}, entities, ...posts.map((post) => ({ [post.id]: post }))),
  {}
)

const ids = handleActions(
  new Map([
    [ 
      fetchPostsReq,  
      (ids) => ({...ids, fetching: true }) 
    ], [ 
      fetchPostsSucc,  
      ({ ids }, { payload: { posts, page } }) => ({ 
        ids: [...ids.slice(0, Elems * (page - 1)), ...posts.map(post => post.id)],
        fetching: false,
        hasMore: posts.length !== 0
      }) 
    ], [ 
      fetchPostsErr, 
      (ids) => ({...ids, fetching: false }) 
    ]
  ]), 
  defaultIds() 
)

const maps = handleAction(
  combineActions(fetchPostsReq, fetchPostsSucc, fetchPostsErr),
  (maps, action) => {
    console.log(action)
    const reduceIfKey = (map, key, isMap = true) =>
      !key? map: (isMap? {...map, [key]: ids(map[key], action) }: ids(map, action))
      
    const { payload: { options: { flag, type, category, query } } } = action
    return {
      byFlag: reduceIfKey(maps.byFlag, flag),
      byType: reduceIfKey(maps.byType, type),
      byCategory: reduceIfKey(maps.byCategory, category),
      byQuery: reduceIfKey(maps.byQuery, query, false)
    }
  },
  defaultMaps
)

const reducer = combineReducers({ entities, maps })

export default reducer
