import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
export default class MovieCard extends React.Component {
  render () {
    const { movies, onMovieClick } = this.props
    return (
      <Container className='d-flex flex-column-reverse'>
        {
          movies.map(movie => {
            if (!movie.Featured) {
              return (
                <Row className='justify-content-between'>
                  <Row className='mb-5 align-items-center'>
                    <Col lg={6}>
                      <img className='min-vh-100 ms-2 mt-5' src={movie.ImagePath} />
                    </Col>
                    <Col lg={6}>
                      <h1>{movie.Title}</h1>
                      <p>{movie.Description}</p>
                      <a onClick={() => onMovieClick(movie)} variant='link'>Open</a>
                    </Col>
                  </Row>
                </Row>
              )
            }
          })
        }
        <Row>
          <h1 className='ms-2'>Featured</h1>
          {
          movies.map(movie => {
            if (movie.Featured === true) {
              return (
                <>
                  <Col lg={2}>
                    <Card key={movie._id} className='m-2'>
                      <Card.Img src={movie.ImagePath} />
                      <Card.Body>
                        <Card.Title>
                          {movie.Title}
                        </Card.Title>
                      </Card.Body>
                      <Button onClick={() => onMovieClick(movie)} variant='link'>Open</Button>
                    </Card>
                  </Col>
                </>
              )
            }
          })
        }
        </Row>
      </Container>
    )
  }
}
// set the static propTypes property on MovieCard to an object that contains special values provided as utilties by prop-types
MovieCard.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string
  })),
  onMovieClick: PropTypes.func.isRequired
}
