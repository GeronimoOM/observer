import { createActions } from 'redux-actions'
import Api from '../config/api'
import handleErrors from '../util/handleErrors'

export const { fetchPostsReq, fetchPostsSucc, fetchPostsErr } = createActions({
  FETCH_POSTS_REQ: (options, page) => ({ options, page }),
  FETCH_POSTS_SUCC: (posts, options, page) => ({ posts, options, page }),
  FETCH_POSTS_ERR: (error, options) => ({ error, options })
})

export function fetchPosts(options = {}, page = 1) {
  return (dispatch) => {
    dispatch(fetchPostsReq(options, page))

    return fetch(buildUrl(options, page))
    .then(handleErrors)
    .then(response => response.json())
    .then(posts => dispatch(fetchPostsSucc(
        posts.map((post) => ({ ...post, added: new Date(post.added) })), 
        options, page
    )))
    .catch(error => dispatch(fetchPostsErr(error, options)))
  }
}

export function fetchPostsByFlag(flag, page) {
  return fetchPosts({ flag }, page)
}

export function fetchPostsByCategory(category, page) {
  return fetchPosts({ category }, page)
}

export function fetchPostsByType(type, page) {
  return fetchPosts({ type }, page)
}

export function fetchPostsByQuery(query) {
  return fetchPosts({ query })
}

function buildUrl(options, page) {
  const url = new URL(!options.query? Api.Posts : Api.PostsSearch)
  url.search = new URLSearchParams({ ...options, page })
  return url
}