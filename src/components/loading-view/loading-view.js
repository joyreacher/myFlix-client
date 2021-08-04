import React from 'react'

// bootstrap
import { Container, Spinner, Row } from 'react-bootstrap'
// custom styles
import './loading-view.scss'

function Loading () {
  return (
    <Container>
      <Row className='d-grid'>
        <Spinner animation='border' />
        <h1 className='animation__loading'>Loading</h1>
      </Row>
    </Container>
  )
}

export default Loading
