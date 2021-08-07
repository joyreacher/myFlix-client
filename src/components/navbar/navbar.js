import React from 'react'
import { Link } from 'react-router-dom'
// Bootstrap
import { Navbar, Container, Row } from 'react-bootstrap'

// Custom styles
import './navbar.scss'
function Nav ({ onLoggedIn, user }) {
  console.log(user)
  return (
    <Navbar className='mt-2 mb-5'>
      <Container>
        <Navbar.Brand>
          <Row className='d-flex justify-content-start align-items-center'>
            <Link className='home-link' to='/'>
              <span className='cinema'>Cinema</span>
              <span className='barn'>Barn</span>
            </Link>
          </Row>
        </Navbar.Brand>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text onClick={() => onLoggedIn()}>
            Signed in as: {user}
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text onClick={() => onLoggedIn()}>
            Logout
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Nav
