
export class PostsStore {
  constructor(store) {
    this.posts = store.posts
  }

  getPostById(id) {
    return this.posts.entities[id]
  }

  getPostsByFlag(flag) {
    return this._getPostEntities(this.posts.maps.byFlag[flag])
  }

  getPostsByCategory(category) {
    return this._getPostEntities(this.posts.maps.byCategory[category])
  }

  getPostsByType(type) {
    return this._getPostEntities(this.posts.maps.byType[type])
  }

  getPostsByQuery() {
    return this._getPostEntities(this.posts.maps.byQuery)
  }

  _getPostEntities({ ids, fetching, hasMore }) {
    return {
      posts: ids.map(id => this.getPostById(id)),
      fetching,
      hasMore
    } 
  }
}

export default function postsStore(store) {
  return new PostsStore(store)
}