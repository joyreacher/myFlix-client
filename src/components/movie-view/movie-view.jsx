import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

// Custom styles
import './movie-view.scss'
import { Container } from 'react-bootstrap'
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
      <Container className='my-5'>
        <Row lg={12}>
          <Col lg={3} className='my-5'>
            <Image className='shadow-1' src={movie.ImagePath} />
          </Col>
          <Col lg={8} className='my-4'>
            <h2 className='display-1 fs-1 movie__title'>{movie.Title}</h2>
            <p className='fs-5'>{movie.Director.Name}</p>
            <p className='fs-5'>{movie.Genre.Name}</p>
            <p className='fs-6'>{movie.Description}</p>
          </Col>
          <Col lg={12} className='mb-5 d-flex justify-content-evenly'>
            <Link to={`/directors/${movie.Director.Name}`}>
              <button className='shadow-1  btn btn-outline-dark'>Director</button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <button className='shadow-1  btn btn-outline-dark'>Genre</button>
            </Link>
            <button className='shadow-1  btn btn-outline-dark' onClick={() => onBackClick(null)}>Back</button>
          </Col>
        </Row>
      </Container>
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
