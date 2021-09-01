import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Col } from 'react-bootstrap'

import './footer.scss'

function Footer ({ user }) {
  const path = '/user/' + user
  return (
    <Navbar className='footer'>
      <Container className='d-flex align-items-start'>
        <Col className='footer__col d-flex flex-column align-items-center ps-5' sm={6} md={6} lg={6}>
          <div className='d-flex flex-column'>
            <h3 className='fs-3'>Cinema Barn</h3>
            <a href='https://github.com/joyreacher/movie_api#readme'>API Documentation</a>
            <a href='https://github.com/joyreacher/myFlix-client'>Github (Client)</a>
            <a href='https://github.com/joyreacher/movie_api'>Github (API)</a>
          </div>
        </Col>
        <Col className='footer__col d-flex flex-column align-items-sm-center pe-5' sm={6} md={6} lg={6}>
          <div>
            <h3 className='fs-3'>My Account</h3>
            <Link to={path}>My Profile</Link>
          </div>
        </Col>
      </Container>
    </Navbar>
  )
}

export default Footer
