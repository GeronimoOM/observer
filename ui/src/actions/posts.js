import { createActions } from 'redux-actions'
import Api from '../config/api'


export const { fetchPostsReq, fetchPostsSucc, fetchPostsErr } = createActions({
  FETCH_POSTS_REQ: (page) => ({ page }),
  FETCH_POSTS_SUCC: (posts, page) => ({ posts, page })
}, 'FETCH_POSTS_ERR')

export function fetchPosts(page = 1) {
  return (dispatch) => {
    dispatch(fetchPostsReq(page))

    const url = new URL(Api.posts)
    url.search = new URLSearchParams({ page })
    return fetch(url, {method: "GET"})
    .then(response => response.json())
    .then(posts => dispatch(fetchPostsSucc(
        posts.map((post) => ({ ...post, added: new Date(post.added) })), page
    )))
    .catch(e => dispatch(fetchPostsErr(e.message)))
  }
}
