import React from 'react'
import PropTypes from 'prop-types'
import { Post } from '../types'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const PostsSearchBar = ({ posts, fetchPosts, fetching }) => (
    <AsyncTypeahead
      className='PostsSearchBar'
      options={posts}
      onSearch={fetchPosts}
      isLoading={fetching}
      labelKey={'title'}
      minLength={3}
      delay={500}
      promptText={'Поиск'}
      searchPosts={'Идет поиск...'}
      filterBy={() => true}
      renderMenuItemChildren={({ title, subtitle }) => (
        <div>
          <h4>{title}</h4>
          <p>{subtitle}</p>
        </div>
    )}
    />
  )
  
  PostsSearchBar.propTypes = {
    posts: PropTypes.arrayOf(Post).isRequired,
    fetchPosts: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired
  }
  
  export default PostsSearchBar