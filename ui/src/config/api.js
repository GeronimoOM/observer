const ApiBase = 'https://observer-news-api.herokuapp.com/api'

export default Object.freeze({
  Posts: ApiBase + '/posts',
  PostsSearch: ApiBase + '/posts/search',
  Categories: ApiBase + '/categories'
})

export const Elems = 10
