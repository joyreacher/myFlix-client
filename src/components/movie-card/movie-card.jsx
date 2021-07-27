import React from 'react';

export default class MovieCard extends React.Component {
  render(){
    const { movie } = this.props;
    return <div className="movie-card">{movie.Title}</div>
  }
}