import { handleActions } from 'redux-actions'
import { fetchPostsReq, fetchPostsSucc, fetchPostsErr } from  '../actions/posts'
import { PostFlags, PostTypes } from '../common/posts'
import { Categories } from '../common/categories'
import { Elems } from '../config/api'
import { identity } from '../util/functions'

const defaultState = {
  entities: {},
  maps: {
    byFlag: defaultStateMap(Object.values(PostFlags)),
    byType: defaultStateMap(Object.values(PostTypes)),
    byCategory: defaultStateMap(Categories.map(c => c.id)),
    byQuery: defaultStateIds()
  }
}

function defaultStateMap(keys) {
  return keys.reduce((map, key) => Object.assign(map, { [key]: defaultStateIds() }), {})
}

function defaultStateIds() {
  return { ids: [], fetching: false }
}

const reducer = handleActions(
  new Map([
    [ 
      fetchPostsReq, 
      (state, { payload: { options } }) => stateReducer(state, 
        (maps) => mapsReducer(maps, options, (ids) => idsReducer(ids, { fetching: true })))
    ], [ 
      fetchPostsSucc,  
      (state, { payload: { posts, options, page } }) => stateReducer(state, 
        (maps) => mapsReducer(maps, options, (ids) => idsReducer(ids, { posts, page, fetching: false } )),
        (entities) => entitiesReducer(entities, posts))
    ], [ 
      fetchPostsErr, 
      (state, { payload: { options } }) => stateReducer(state, 
        (maps) => mapsReducer(maps, options, (ids) => idsReducer(ids, { fetching: false })))
    ]
  ]),
  defaultState
)

function stateReducer(state, mapsReducer, entitiesReducer = identity) {
  return {
    entities: entitiesReducer(state.entities),
    maps: mapsReducer(state.maps)
  }
}

function entitiesReducer(entities, posts) {
  return posts.reduce(
    (entities, post) => Object.assign(entities, { [post.id]: post }), 
    Object.assign({}, entities)
  )
}

function mapsReducer(maps, { flag, category, type, query }, idsReducer) {
  function reduceIfKey(map, key, isMap = true) {
    return !key? map:
      isMap? Object.assign({}, map, { [key]: idsReducer(map[key]) }): 
      idsReducer(map)
  }

  return {
    byFlag: reduceIfKey(maps.byFlag, flag),
    byType: reduceIfKey(maps.byType, type),
    byCategory: reduceIfKey(maps.byCategory, category),
    byQuery: reduceIfKey(maps.byQuery, query, false)
  }
}

function idsReducer({ ids }, { posts, page, fetching }) {
  return { 
    ids: !posts? ids: 
      ids.slice(0, Elems * (page - 1) + 1).concat(posts.map(post => post.id)),
    fetching
  }
}

export default reducer
