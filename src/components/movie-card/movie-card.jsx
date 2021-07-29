import React from 'react'
import PropTypes from 'prop-types'
export default class MovieCard extends React.Component {
  render () {
    const { movie, onMovieClick } = this.props
    return (
      <div className='movie-card' onClick={() => { onMovieClick(movie) }}>
        {movie.Title}
        {movie.ImagePath}   //! movie.ImagePath holds value stored in DB
      </div>
    )
  }
}
// set the static propTypes property on MovieCard to an object that contains special values provided as utilties by prop-types
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired    //! prop types error -- movie.ImagePath marked but is null
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}
