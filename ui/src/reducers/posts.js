import { handleActions } from 'redux-actions'
import { fetchPostsReq, fetchPostsSucc, fetchPostsErr } from  '../actions/posts'
import { PostFlags, PostTypes } from '../common/posts'
import { Categories } from '../common/categories'

const defaultState = {
  entities: {},
  byFlag: defaultMapState(Object.values(PostFlags)),
  byType: defaultMapState(Object.values(PostTypes)),
  byCategory: defaultMapState(Categories.map(c => c.id))
}

function defaultMapState(keys) {
  return keys.reduce(
    (map, key) => Object.assign(map, { [key]: { ids: [], fetching: false } }), {}
  )
}

const reducer = handleActions(
  new Map([
    [ 
      fetchPostsReq, 
      (state, { payload: { options} }) => 
        mapsApply(state, options, (map, key) => mapFetching(map, key, true))
    ],
    [ 
      fetchPostsSucc, 
      (state, { payload: { posts, options } }) => 
        Object.assign(
          mapsApply(state, options, 
            (map, key) => mapAdd(map, key, posts)), 
          { entities: entities(state.entities, posts) }
        )
    ],
    [ 
      fetchPostsErr, 
      (state, { payload: { options} }) => 
        mapsApply(state, options, (map, key) => mapFetching(map, key, false))
    ],
  ]),
  defaultState
)

function entities(entities, posts) {
  return posts.reduce(
    (entities, post) => Object.assign(entities, { [post.id]: post }), 
    Object.assign({}, entities)
  )
}

function mapsApply(state, { flag, category, type }, func) {
  return Object.assign({}, state, {
    byFlag: func(state.byFlag, flag),
    byType: func(state.byType, type),
    byCategory: func(state.byCategory, category)
  })
}

function mapAdd(map, key, posts) {
  return !key ? map :
    Object.assign({}, map, { 
      [key]: { 
        ids: (map[key].ids).concat(posts.map(post => post.id)),
        fetching: false
      }
    })
}

function mapFetching(map, key, fetching) {
  return !key ? map : 
    Object.assign({}, map, {
      [key]: Object.assign({}, map[key], { fetching: true }) 
    })
}

export default reducer
