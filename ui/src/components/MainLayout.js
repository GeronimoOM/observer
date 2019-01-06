import React from 'react'
import { Route } from 'react-router-dom'
import HeaderNavContainer from '../containers/HeaderNavContainer'
import MainPostsContainer from '../containers/MainPostsContainer'
import CategoryPostsContainer from '../containers/CategoryPostsContainer'
import PostsSearchBarContainer from '../containers/PostsSearchBarContainer'
import { categoryIdByUrl } from '../common/categories'

const MainLayout = () => (
  <div className='layout'>
    <div>
      <HeaderNavContainer/>
    </div>
    <div>
      <PostsSearchBarContainer/>
    </div>
    <div>
      <Route path='/' exact component={ MainPostsContainer } />
      <Route path='/:category' render={({ match: { params: { category } } }) => (
        <CategoryPostsContainer category={ categoryIdByUrl(category) } />
      )}/>
    </div>
    <div>
      diagry ©2018
    </div>
  </div>
)

export default MainLayout
