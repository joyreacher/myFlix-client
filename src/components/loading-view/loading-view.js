import React, { useEffect } from 'react'

// bootstrap
import { Container, Spinner, Row } from 'react-bootstrap'
// custom styles
import './loading-view.scss'

function Loading () {
  useEffect(()=>{
    let LoadingText = document.querySelector('.loading__text');
    let tl = gsap.timeline({yoyo: true})
    tl.from(LoadingText, { duration: 1.2, opacity: 0, yoyo: true, repeat: -1})
  }, [])
  return (
    <Container>
      <Row className='d-grid'>
        <h1 className='loading__text'>Loading</h1>
        <Spinner animation='border' />
      </Row>
    </Container>
  )
}

export default Loading
