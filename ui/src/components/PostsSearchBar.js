import React from 'react'
import PropTypes from 'prop-types'
import { Post } from '../types'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

// TODO
const PostsSearchBar = ({ posts, fetchPosts, fetching }) => (
    <AsyncTypeahead
      /** Lookup documentation of AsyncTypeahead component, 
          find which 3 parameters correspond to passed properties **/
      labelKey={ 'title' }
      minLength={ 3 }
      promptText={ 'Поиск' }
      searchPosts={ 'Идет поиск...' }
      renderMenuItemChildren={ ({ title, subtitle }) => (
        /** render Post in dropdown, any valid JSX **/
    )}
    />
  )
  
  PostsSearchBar.propTypes = {
    posts: PropTypes.arrayOf(Post).isRequired,
    fetchPosts: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired
  }
  
  export default PostsSearchBar