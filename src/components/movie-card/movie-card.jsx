import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Card, Button, CardGroup, Image } from 'react-bootstrap'

// custom styles
import './movie-card.scss'
export default class MovieCard extends React.Component {
  render () {
    const { movies, onMovieClick } = this.props
    return (
      <Container className='d-flex flex-column'>
        <div className='section__start'>
          <h1 className='display-1'>Featured</h1>
        </div>
        <Row xs={2} sm={2} md={4} lg={6} className='align-items-center'>
          {
          movies.map(movie => {
            if (movie.Featured === true) {
              return (
                <>
                <CardGroup className='my-5'>
                  <Col xs={12} sm={12} md={12} lg={12}>
                      <Card key={movie._id} className='m-2 bg-light mb-sm-1'>
                        <Card.Header>{movie.Title}</Card.Header>
                        <Card.Img variant='top' src={movie.ImagePath} />
                          <Card.Body className='p-2'>
                            <Card.Text className='text-truncate'>{movie.Description}</Card.Text>
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
        <div className='section__start'>
          <h1 className='ps-2 display-1'>Browse</h1>
        </div>
        <Row>
        {
          movies.map(movie => {
            if (!movie.Featured) {
              return (
                <Row md={2} className='mb-5 align-items-center justify-content-between' >
                  <Col sm={3} md={12} lg={3}>
                    <Image className='ms-2 mt-5' src={movie.ImagePath} />
                  </Col>
                  <Col lg={6}>
                    <h2 className='display-2'>{movie.Title}</h2>
                    <p>{movie.Description}</p>
                    <Button className='btn btn-dark' onClick={() => onMovieClick(movie)} variant='button'>Open</Button>
                  </Col>
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
