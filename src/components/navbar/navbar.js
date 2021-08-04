import React, { useEffect } from "react"

// Bootstrap
import { Navbar, Container, Row } from 'react-bootstrap'

// Custom styles
import './navbar.scss'
function Nav () {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <Row className='d-flex justify-content-start align-items-center'>
            <span className='cinema'>Cinema</span>
            <span className='barn'>Barn</span>
          </Row>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Nav
