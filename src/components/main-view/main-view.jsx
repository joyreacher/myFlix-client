import React from 'react';
import MovieCard from '../movie-card/movie-card'
import MovieView from '../movie-view/movie-view'

export default class MainView extends React.Component{
  constructor(){
    super();
    this.state = {
      selectedMovie: null,
      movies:[
        {
          _id: 1, Title: "Inception", Description: 'Inception description', ImagePath: 'inception.png'
        },
        {
          _id: 2, Title: "The Shawshank Redemption", Description: 'Shawshank Redemption description', ImagePath: 'shawshankredemption.png'
        },
        {
          _id: 3, Title: "Gladiator", Description: 'Gladiator description', ImagePath: 'gladiator.png'
        },
      ]
    }
  }
  setSelectedMovie(newSelectedMovie){
    this.setState({
      selectedMovie: newSelectedMovie
    })
  }
  render(){
    const { movies, selectedMovie } = this.state
    if(selectedMovie) return <MovieView movie={selectedMovie} />;
    if(movies.length === 0)return <div className="main-view">The list is empty!</div>;
    return(
      <div className='main-view'>
        {movies.map(movie => <MovieCard  key={movie._id} movie={movie} onMovieClick={(newSelectedMovie)=>{ this.setSelectedMovie(movie) }}/>)}
      </div>
    );
  }
}