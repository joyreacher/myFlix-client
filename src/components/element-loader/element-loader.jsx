import React, { useEffect } from 'react'
import gsap from 'gsap'
// bootstrap
import { Container, Spinner, Row } from 'react-bootstrap'
// custom styles
import './element-loader.scss'

function ElementLoader () {
  useEffect(() => {
    const LoadingText = document.querySelector('.loading__text')
    const tl = gsap.timeline({ yoyo: true })
    tl.from(LoadingText, { duration: 0.1, opacity: 0, yoyo: true, repeat: -1 })
  }, [])
  return (
    <Container>
      <Row className='element-loader'>
        <Spinner animation='border' />
        <p className='loading__text'>Loading</p>
      </Row>
    </Container>
  )
}

export default ElementLoader
