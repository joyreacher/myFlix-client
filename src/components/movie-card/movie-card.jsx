import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Card, Button, CardGroup, CardColumns } from 'react-bootstrap'

// custom styles
import './movie-card.scss'
export default class MovieCard extends React.Component {
  render () {
    const { movies, onMovieClick } = this.props
    return (
      <Container className='d-flex flex-column'>
        <h1 >Featured</h1>
        <Row lg={6} className='align-items-center'>
          {
          movies.map(movie => {
            if (movie.Featured === true) {
              return (
                <>
                <CardGroup>
                  <Col lg={12}>
                      <Card key={movie._id} className='m-2 bg-light'>
                        <Card.Header>{movie.Title}</Card.Header>
                        <Card.Img variant='top' src={movie.ImagePath} />
                          <Card.Body className='p-2'>
                            <Card.Text className='text-truncate'>
                              {movie.Description}
                            </Card.Text>
                          </Card.Body>
                        <Button className='btn btn-dark' onClick={() => onMovieClick(movie)}>Open</Button>
                      </Card>
                  </Col>
                  </CardGroup>
                </>
              )
            }
          })
        }
        </Row>
        <h1 className='ms-2'>Browse</h1>
        <Row>
        
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
                      <h2 className='display-2'>{movie.Title}</h2>
                      <p>{movie.Description}</p>
                      <Button className='btn btn-dark' onClick={() => onMovieClick(movie)} variant='button'>Open</Button>
                    </Col>
                  </Row>
                </Row>
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
