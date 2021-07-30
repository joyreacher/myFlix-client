import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
export default class MovieCard extends React.Component {
  render () {
    const { movie, onMovieClick } = this.props
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
      </Card>
    )
  }
}
// set the static propTypes property on MovieCard to an object that contains special values provided as utilties by prop-types
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}
