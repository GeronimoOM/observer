import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostsList from '../components/PostsList'
import { fetchPosts } from '../actions/posts'


class PostsListContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
      <PostsList posts={this.props.posts} />
    )
  }
}

export default connect(
  (state) => { 
    return {
      posts: state.posts.items 
    }
  },
  { fetchPosts }
)(PostsListContainer)
