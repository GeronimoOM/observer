import React from 'react'
import { Row, Col } from 'reactstrap'
import MainPostsContainer from '../containers/MainPostsContainer'
import NewsPostsContainer from '../containers/NewsPostsContainer'

const MainLayout = () => (
    <Row className='d-flex justify-content-center'>
        <Col md={3}>
            <NewsPostsContainer/>
        </Col>
        <Col md={5}>
            <MainPostsContainer/>
        </Col>
        <Col md={3}>
            <NewsPostsContainer/>
        </Col>
    </Row>
)

export default MainLayout
