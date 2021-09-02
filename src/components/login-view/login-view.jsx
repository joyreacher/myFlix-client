import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { login } from '../../actions/actions'
import './login-view.scss'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const mapStateToProps = state => {
  const { profile } = state
  return {profile}
}
function LoginView (props) {
  const { profile } = props
  const [user, setUser] = useState({
    value: '',
    errMsg: ''
  })
  const [username, setUsername] = useState({
    value: '',
    errMsg: ''
  })
  // console.log(username.value == false)
  const [password, setPassword] = useState({
    value: '',
    errMsg: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser({errMsg: ''})
    const pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/)
    // console.log(username.value)
    if (!password.value || password.value.length == 0) {
      return setPassword({ errMsg: 'Enter your password' })
      // console.log(password)
    } if (!username.value || username.value.length == 0) {
      return setUsername({ errMsg: 'Enter a username' })
      // console.log(username)
    } if (pattern.test(username.value)) {
      console.log('unwanted chars')
      return setUsername({ value: false, errMsg: 'Please only use letters and numbers in your username' })
    } else {
      const value = e.target.value
      props.login(e.target.value)
      axios.post('https://cinema-barn.herokuapp.com/login', {
        Username: profile.username,
        Password: password.value
      }).then(res => {
        const data = res.data
        props.onLoggedIn(data)
      }).catch(e => {
        // contains error response
        // console.log(e.response)
        if (e.response.status == 400) {
          setUser({errMsg: 'This user may not exist.'})
        }
        console.log('error')
      })
    }
  }

  return (
    <Row className='justify-content-center min-vh-100 align-items-center'>
      <Col xs={10} sm={10} md={7} lg={6} xl={7}>
        <Form className='login__form jumbotron p-5' onSubmit={handleSubmit}>
          <label className='text-danger'>{user.errMsg ? user.errMsg : ''}</label>
          <Form.Group>
            <Form.Label column='sm'>
              <h1 className='fs-1 display-1'>Sign in</h1>
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label='Username' controlId='floatingInput'>
              <Form.Control name='username' placeholder='Username' type='text' onChange={e => {props.login(e.target.value); setUsername({value: e.target.value})}} />
            </FloatingLabel>
            <label className='text-danger'>
              {
                username.errMsg ? username.errMsg : ''
              }
            </label>
            <FloatingLabel label='Password' controlId='floatingInput'>
              <Form.Control name='pass' placeholder='Password' type='password' onChange={e => setPassword({ value: e.target.value })} />
            </FloatingLabel>
            <label className='text-danger'>
              {
                !password.value ? password.errMsg : ''
              }
            </label>
            <Form.Control type='submit' value='submit' />
          </Form.Group>
          <Form.Group className='d-flex justify-content-start mt-5'>
            <p className='me-2 text-start'>Dont have an account?</p>
            <Link className='fs-6' to='/register'>Register</Link>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}
export default connect(mapStateToProps, { login })(LoginView)
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}
