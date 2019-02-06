import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PostFlags } from '../common/posts'
import { fetchPostsByFlag } from '../actions/posts'
import PostsStore from '../data/posts'
import MainPosts from '../components/MainPosts'

class MainPostsContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return <MainPosts posts={this.props.posts} />
  }
}

export default connect(
  (state) => PostsStore(state).getPostsByFlag(PostFlags.Main),
  { fetchPosts: () => fetchPostsByFlag(PostFlags.Main) }
)(MainPostsContainer)