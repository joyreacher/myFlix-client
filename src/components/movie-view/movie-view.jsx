import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from '../ErrorBoundary'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

// Custom styles
import './movie-view.scss'
class MovieView extends React.Component {
  // refer to the callback function when adding and removing the listener
  keypressCallback (event) {
    console.log(event.key)
  }

  // runs after render()
  componentDidMount () {
    document.addEventListener('keypress', this.keypressCallback)
  }

  // remove the event listener when component is about to be unmounted
  componentWillUnmount () {
    document.removeEventListener('keypress', this.keypressCallback)
  }

  render () {
    const { movie, onBackClick } = this.props
    return (
      <ErrorBoundary>
        <Container className='mb-5'>
          <Row lg={6}>
            <Col className='my-5 movie-poster d-flex justify-content-center' sm={12}>
              <img src={movie.ImagePath} />
            </Col>
          </Row>
          <Row className='movie-view mt-4 d-flex justify-content-center' sm={12} md={12} lg={12}>
            <Col className='w-75' lg={12}>
              <div className='movie-title'>
                <span className='label color-accent-2'>Title: </span>
                <h2 className='value d-inline-block'>{movie.Title}</h2>
              </div>
              <div className='movie-description'>
                <span className='label color-accent-2'>Description: </span>
                <p className='value'>{movie.Description}</p>
              </div>
              <Button className='btn btn-dark' onClick={() => onBackClick(null)}>Back</Button>
            </Col>
          </Row>
        </Container>
      </ErrorBoundary>
    )
  }
}

export default MovieView

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}
