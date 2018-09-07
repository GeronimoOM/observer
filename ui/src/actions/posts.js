import { createActions } from 'redux-actions'
import Api from '../config/api'
import handleErrors from '../util/handleErrors'

export const { fetchPostsReq, fetchPostsSucc, fetchPostsErr } = createActions({
  FETCH_POSTS_REQ: (options, page) => ({ options, page }),
  FETCH_POSTS_SUCC: (posts, options, page) => ({ posts, options, page }),
}, 'FETCH_POSTS_ERR')

export function fetchPosts(options = {}, page = 1) {
  return (dispatch) => {
    dispatch(fetchPostsReq(options, page))

    const url = buildUrl(options, page)
    return fetch(url, {method: "GET"})
    .then(handleErrors)
    .then(response => response.json())
    .then(posts => dispatch(fetchPostsSucc(
        posts.map((post) => ({ ...post, added: new Date(post.added) })), 
        options, page
    )))
    .catch(error => dispatch(fetchPostsErr(error)))
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

function buildUrl({ flag, category, type }, page) {
  const url = new URL(Api.Posts)
  url.search = new URLSearchParams({ page })
  if (flag) {
    url.searchParams.append(flag, true)
  } else {
    if (category) 
      url.searchParams.append('category', category)
    if (type) 
      url.searchParams.append('type', type)
  }
  return url
}