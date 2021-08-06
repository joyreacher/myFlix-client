import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import './login-view.scss'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
export function LoginView (props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('https://cinema-barn.herokuapp.com/login', {
      Username: username,
      Password: password
    }).then(res => {
      const data = res.data
      props.onLoggedIn(data)
    }).catch(e => {
      console.log('no such user')
    })
  }

  return (
    <Row className='justify-content-center min-vh-100 align-items-center'>
      <Col xs={10} sm={10} md={7} lg={6} xl={7}>
        <Form className='login__form jumbotron p-5'>
          <Form.Group>
            <Form.Label column='sm'>
              <h1 className='fs-1 display-1'>Sign in</h1>
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label='Username' controlId='floatingInput'>
              <Form.Control placeholder='Username' type='text' value={username} onChange={e => setUsername(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel label='Password' controlId='floatingInput'>
              <Form.Control placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
            </FloatingLabel>
            <Button variant='success' type='submit' onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Group>
          <Form.Group className='d-flex justify-content-start mt-5'>
            <p className='me-2 text-start'>Dont have an account?</p>
            <a className='' onClick={() => props.onRegisterClick()}>Register</a>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired
}
