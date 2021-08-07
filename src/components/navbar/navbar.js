import React from 'react'
import { Link } from 'react-router-dom'
import { LoginView } from '../login-view/login-view'
// Bootstrap
import { Navbar, Container, Row, Button } from 'react-bootstrap'

// Custom styles
import './navbar.scss'

function Nav ({ onLogOutClick, user }) {
  if(!user) return (
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
      </Container>
    </Navbar>
  )
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
          <Navbar.Text>
            Signed in as: <Link to={`/user/${user}`}>{user}</Link>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text onClick={()=>onLogOutClick()}>
            <Button className='btn bg-dark'>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Nav
