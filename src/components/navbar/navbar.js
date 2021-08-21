import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoginView } from '../login-view/login-view'
// Bootstrap
import { Navbar, Container, Row, Button } from 'react-bootstrap'

const mapStateToProps = state => {
  const { profile } = state
  return { profile }
}
// Custom styles
import './navbar.scss'

function Nav ({ onLogOutClick, user, profile }) {
  console.log(profile)
  if (!localStorage.getItem('token')) {
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
        </Container>
      </Navbar>
    )
  }
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
            Signed in as: <Link to={`/user/${profile.username}`}>{profile.username}</Link>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text onClick={() => onLogOutClick()}>
            <Button className='btn bg-dark'>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default connect(mapStateToProps)(Nav)
