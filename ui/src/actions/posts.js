import { createActions } from 'redux-actions'
import Api from '../config/api'
import { categoryByUrl } from '../util/categories'
import handleErrors from '../util/handleErrors'

export const { fetchPostsReq, fetchPostsSucc, fetchPostsErr } = createActions({
  FETCH_POSTS_REQ: (page, category) => ({ page, category }),
  FETCH_POSTS_SUCC: (posts, page) => ({ posts, page }),
}, 'FETCH_POSTS_ERR')

export function fetchPosts(page = 1, category) {
  return (dispatch, getState) => {
    dispatch(fetchPostsReq(page, category))

    const url = new URL(Api.posts)
    url.search = new URLSearchParams({ page })
    category = categoryByUrl(getState().categories, category)
    if (category) {
      url.searchParams.append('category', category.id)
    }
    return fetch(url, {method: "GET"})
    .then(handleErrors)
    .then(response => response.json())
    .then(posts => dispatch(fetchPostsSucc(
        posts.map((post) => ({ ...post, added: new Date(post.added) })), page
    )))
    .catch(error => dispatch(fetchPostsErr(error)))
  }
}
