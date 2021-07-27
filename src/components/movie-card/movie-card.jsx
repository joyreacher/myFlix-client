import React from 'react';

export default class MovieCard extends React.Component {
  render(){
    const { movie, onMovieClick } = this.props;
    return <div className="movie-card" onClick={()=>{ onMovieClick(movie) }}>{movie.Title}</div>
  }
}