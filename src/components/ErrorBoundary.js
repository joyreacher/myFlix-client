import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super()
    this.state = {
      hasError: false
    }
  }

  componentDidCatch () {
    this.setState({ hasError: true })
  }

  logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('image')
    window.location.reload()
  }

  render () {
    if (this.state.hasError || this.props.hasError) {
      return (
        <Container className='min-vh-100 d-flex justify-content-center align-items-center'>
          <h1>We have an error.</h1>
          <p>If you are seeing this <Button onClick={() => this.logout()}>Click me</Button></p>
        </Container>
      )
    } else {
      return <Container>
        {this.props.children}
    </Container>
    }
  }
}

export default ErrorBoundary
