import React from 'react'
import PropTypes from 'prop-types'
import { Row, Container, CardGroup } from 'react-bootstrap'
// components
import NotFeatured from '../not-featured/not-featured'
import Featured from '../featured/featured'

// custom styles
import './movie-card.scss'
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
              <Featured movies={movies} />
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
