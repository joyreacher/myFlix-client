import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [username, setUsername] = useState({
    value: "",
    placeholder: 'Username',
    valid: true,
    typeMismatch: false,
    errMsg: null
  })
  const [password, setPassword] = useState({
    value: "",
    placeholder: 'Password',
    valid: true,
    typeMismatch: false,
    errMsg: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!password.value) {
      setUsername({ errMsg: 'Enter your password' })
      console.log(username)
    } if (!username.value) {
      setUsername({ errMsg: 'Enter a username' })
      console.log(username)
    } else if (username.value && password.value) {
      axios.post('https://cinema-barn.herokuapp.com/login', {
        Username: username.value,
        Password: password.value
      }).then(res => {
        const data = res.data
        props.onLoggedIn(data)
      }).catch(e => {
        console.log('no such user')
      })
    }
  }

  return (
    <Row className='justify-content-center min-vh-100 align-items-center'>
      <Col xs={10} sm={10} md={7} lg={6} xl={7}>
        <Form className='login__form jumbotron p-5' onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label column='sm'>
              <h1 className='fs-1 display-1'>Sign in</h1>
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label='Username' controlId='floatingInput'>
              <Form.Control name='username' placeholder='Username' type='text' value={username.value} onChange={e => setUsername({ value: e.target.value })} />
            </FloatingLabel>
            <FloatingLabel label='Password' controlId='floatingInput'>
              <Form.Control name='pass' placeholder='Password' type='password' value={password.value} onChange={e => setPassword({ value: e.target.value })} />
            </FloatingLabel>
            <Form.Control type='submit' value='submit'/>
            {/* <Button variant='success' type='submit' onClick={handleSubmit}>
              Submit
            </Button> */}
          </Form.Group>
          <Form.Group className='d-flex justify-content-start mt-5'>
            <p className='me-2 text-start'>Dont have an account?</p>
            <Link className='fs-6' to={'/register'} >Register</Link>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
}
