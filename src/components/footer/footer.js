import React from 'react'

import { Navbar, Container, Col } from 'react-bootstrap'

import './footer.scss'

function Footer () {
  return (
    <Navbar className='footer'>
      <Container>
        <Col className='footer__col d-flex flex-column align-items-sm-center ps-5' sm={6} md={6} lg={6}>
          <div>
            <h3 className='fs-3'>Cinema Barn</h3>
            <p>API Documentation</p>
            <p>Github (Client)</p>
            <p>Github (API)</p>
          </div>
        </Col>
        <Col className='footer__col d-flex flex-column align-items-sm-center pe-5' sm={6} md={6} lg={6}>
          <div>
            <h3 className='fs-3'>My Account</h3>
            <p>My Profile</p>
            <p>My Movies</p>
          </div>
        </Col>
      </Container>
    </Navbar>
  )
}

export default Footer