
export class PostsStore {
  constructor(store) {
    this.posts = store.posts
  }

  getPostsByFlag(flag) {
    return this._getPostEntities(this.posts.byFlag[flag])
  }

  getPostsByCategory(category) {
    return this._getPostEntities(this.posts.byCategory[category])
  }

  getPostsByType(type) {
    return this._getPostEntities(this.posts.byType[type])
  }

  _getPostEntities({ ids, fetching }) {
    return {
      posts: ids.map(id => this.posts.entities[id]),
      fetching
    } 
  }
}

export default function postsStore(store) {
  return new PostsStore(store)
}