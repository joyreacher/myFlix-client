import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container, Card, Button, CardGroup, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// custom styles
import './movie-card.scss'
import NotFeatured from '../not-featured/not-featured'
export default class MovieCard extends React.Component {
  render () {
    const { movies } = this.props
    return (
      <Container className='d-flex flex-column'>
        <div className='section__start mt-5'>
          <h1 className='display-1 fs-1 mt-5'>Featured</h1>
        </div>
        <Row className='align-items-center'>
          <Container>
            <CardGroup className='my-5'>
              {
            movies.map(movie => {
              if (movie.Featured === true) {
                return (
                  <Card className='m-2 bg-light mb-sm-1' key={`featured-${movie._id}`}>
                    <Card.Header>{movie.Title}</Card.Header>
                    <Card.Img variant='top' src={movie.ImagePath} />
                    <Card.Body className='p-2'>
                      <Card.Text className='text-truncate'>{movie.Description}</Card.Text>
                    </Card.Body>
                    <Link to={`/movies/${movie._id}`}>
                      <Button className='btn btn-dark'>Open</Button>
                    </Link>
                  </Card>
                )
              }
            })
          }
            </CardGroup>
          </Container>
        </Row>
        <div className='section__start mt-5'>
          <h1 className='display-1 fs-1 mt-5'>Browse</h1>
        </div>
        <Row>
          <NotFeatured movies={movies} />
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
  }))
}
