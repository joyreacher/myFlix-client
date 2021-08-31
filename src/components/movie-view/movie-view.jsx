import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ErrorBoundary from '../ErrorBoundary'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

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
    // console.log(movie.Genre)
    return (
      <ErrorBoundary>
        <Row md={6} lg={6} xl={6} className='my-5 d-flex justify-content-center min-vh-100 align-items-center'>
          <Col lg={4}>
            <Image className='shadow-1' src={movie.ImagePath} />
          </Col>
          <Col lg={6}>
            <h2 className='display-1 fs-1 movie__title'>{movie.Title}</h2>
            <p className='fs-5'>{movie.Director.Name}</p>
            <p className='fs-5'>{movie.Genre.Name}</p>
            {/* <p className='fs-5'>{movie.Director}</p> */}
            <p className='fs-6'>{movie.Description}</p>
            <div className='d-flex justify-content-around'>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button className='shadow-1'>Director</Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button className='shadow-1'>Genre</Button>
              </Link>
              <Button className='shadow-1 btn btn-dark fs-1' onClick={() => onBackClick(null)}>Back</Button>
            </div>
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
