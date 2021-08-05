import React from 'react'

import { Navbar, Container, Row, Col } from 'react-bootstrap'

import './footer.scss'

function Footer () {
  return (
    <Navbar className='footer'>
      <Container className='d-flex justify-content-center'>
        <Row className='d-flex justify-content-between w-100'>
          <Col className='footer__col'>
            <h3 className='fs-1'>Cinema Barn</h3>
            <p>API Documentation</p>
            <p>Github (Client)</p>
            <p>Github (API)</p>
          </Col>
          <Col className='footer__col'>
            <h3 className='fs-1'>My Account</h3>
            <p>My Profile</p>
            <p>My Movies</p>
          </Col>
        </Row>
      </Container>
    </Navbar>
  )
}

export default Footer