import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import MainPostsContainer from '../containers/MainPostsContainer'
import NewsPostsContainer from '../containers/NewsPostsContainer'

const MainLayout = () => (
    <Container>
        <Row>
            <Col>
                <MainPostsContainer/>
            </Col>
            <Col>
                <MainPostsContainer/>
            </Col>
            <Col>
                <MainPostsContainer/>
            </Col>
        </Row>
    </Container>
)

export default MainLayout
