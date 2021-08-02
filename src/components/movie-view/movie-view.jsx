import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from '../ErrorBoundary'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
        <Row className='movie-view'>
          <Col className='movie-poster'>
            <img src={movie.ImagePath} />
          </Col>
          <Col>
            <div className='movie-title'>
              <span className='label'>Title: </span>
              <span className='value'>{movie.Title}</span>
            </div>
            <div className='movie-description'>
              <span className='label'>Description: </span>
              <span className='value'>{movie.Description}</span>
            </div>
            <button onClick={() => onBackClick(null)}>Back</button>
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
