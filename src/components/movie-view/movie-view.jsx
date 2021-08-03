import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from '../ErrorBoundary'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

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
        <Row className='movie-view' lg={12}>
          <Col className='movie-poster' lg={4}>
            <img src={movie.ImagePath} />
          </Col>
          <Col lg={8}>
            <div className='movie-title'>
              <span className='label color-accent-2'>Title: </span>
              <h1 className='value d-inline-block'>{movie.Title}</h1>
            </div>
            <div className='movie-description'>
              <span className='label color-accent-2'>Description: </span>
              <span className='value'>{movie.Description}</span>
            </div>
            <Button className='btn btn-dark' onClick={() => onBackClick(null)}>Back</Button>
          </Col>
        </Row>
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
