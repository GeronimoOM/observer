import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostsList from '../components/PostsList'
import { fetchPosts } from '../actions/posts'


class PostsListContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts(1, this.props.category)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.category !== this.props.category) {
      this.props.fetchPosts(1, this.props.category)
    }
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
