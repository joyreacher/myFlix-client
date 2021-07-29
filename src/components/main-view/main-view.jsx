import React from 'react'
import axios from 'axios'

import { RegistrationView } from '../registration-view/registration-view'
import { LoginView } from '../login-view/login-view'
import MovieCard from '../movie-card/movie-card'
import MovieView from '../movie-view/movie-view'

export default class MainView extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedMovie: null,
      movies: [],
      user: null,
      register: false
    }
  }

  componentDidMount () {
    axios.get('https://cinema-barn.herokuapp.com/movies')
      .then((res) => {
        this.setState({
          movies: res.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  setSelectedMovie (newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    })
  }

  onLoggedIn (user) {
    this.setState({
      user: user,
      register: false
    })
  }

  onRegister () {
    this.setState({
      register: true
    })
    console.log(this.state.register)
  }

  render () {
    const { movies, selectedMovie, user, register } = this.state
    if (register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />
    if (!user) return <LoginView onRegisterClick={() => this.onRegister()} onLoggedIn={user => this.onLoggedIn(user)} />
    if (movies.length === 0) return <div className='main-view'>The list is empty!</div>
    return (
      <div className='main-view'>
        {
          selectedMovie
          // onBackClick(null) -- will run the movies.map condition and display the MovieCard
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} />
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={movie => { this.setSelectedMovie(movie) }} />
            ))
        }
      </div>
    )
  }
}
