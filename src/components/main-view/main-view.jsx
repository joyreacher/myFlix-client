import React from 'react';
import MovieCard from '../movie-card/movie-card'

export default class MainView extends React.Component{
  constructor(){
    super();
    this.state = {
      movies:[
        {
          _id: 1, Title: "Inception", description: 'Inception description', ImagePath: 'inception.png'
        },
        {
          _id: 2, Title: "The Shawshank Redemption", description: 'Shawshank Redemption description', ImagePath: 'shawshankredemption.png'
        },
        {
          _id: 3, Title: "Gladiator", description: 'Gladiator description', ImagePath: 'gladiator.png'
        },
      ]
    }
  }
  render(){
    const { movies } = this.state
    if(movies.length === 0)return <div className="main-view">The list is empty!</div>;
    return(
      <div className='main-view'>
        {movies.map(movie => <MovieCard  key={movie._id} movie={movie} />)}
      </div>
    );
  }
}