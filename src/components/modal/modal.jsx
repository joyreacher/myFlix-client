import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { Form, CardGroup, Col, Card, Button } from 'react-bootstrap';
function mapStateToProps(state) {
  const { movies, user } = state
  return {
    movies, user
  };
}

class Modal extends Component {
  
  getAllMovies = () => {
    const accessToken = localStorage.getItem('token')
    axios.get('https://cinema-barn.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      // console.log(res.data)
      const movieData = res.data.map(item => {
        movies.push({
          _id: item._id,
          title: item.Title,
          ImgPath: item.ImagePath
        })
      })
      // const remove = movies.map(({ _id }) => _id === user.favorite_movies._id)
      // console.log(movies)
      // console.log(user.favorite_movies)
      // show what movies are in your favorites
      user.favorite_movies.map((movie, i) => {
        if (movies[i]._id != movie._id) {
          // console.log(movies[i].title)
        }
      })
      setModal(true)
      return movieData
    }).catch(function (error) {
      console.log(error)
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem('token')
    console.log(e.target)
    // check db for movie
    const result = this.props.movies.find(({ _id }) => _id === e.target.value)
    console.log('resulttttt')
    console.log(result)
    // check favorite movies in user state
    const matchFavs = this.props.user.favorite_movies.find(({ _id }) => _id === e.target.value)
    if (matchFavs) {
      e.target.setAttribute('match', true)
      e.target.setAttribute('disabled', 'disabled')
      e.target.insertAdjacentHTML('afterend', "<span style='color:red'>This movie is in your favorites</span>")
      return false
    } else {
      return axios.post('https://cinema-barn.herokuapp.com/users/mymovies/add', {
        Username: this.props.user.username,
        Title: result.Title
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => {
        // setSub(null)
        const data = res.data
        console.log(data)
        // window.location.reload()
        const username = localStorage.getItem('user')
        const accessToken = localStorage.getItem('token')
        let mongoData = ''
        axios.get(`https://cinema-barn.herokuapp.com/user/${username}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => {
          mongoData = res.data
          console.log(mongoData.favorite_movies)
          return mongoData
        }).then(response => {
          const data = response.data
          this.props.loadUser(mongoData.username, mongoData.email, mongoData.birthday, mongoData.favorite_movies)
          return data
        }).catch(function (error) {
          console.log(error)
        })
      })
        .catch(e => {
          console.log(e)
        })
    }
  }

  render() {
    const { handleSubmit, movies, loadUser } = this.props
    return (
      <div className='modal' tabIndex='-1' id='exampleModal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add movie to your favorites list</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div className='modal-body'>
              <Form onSubmit={handleSubmit}>
                <CardGroup>
                  {movies.length == 0
                    ? '..loading'
                    : movies.map(movie => {
                      return (
                        <Col key={movie._id} lg={3} className=''>
                          <Card>
                            <Card.Title className='movie__title fs-6'>{movie.Title}</Card.Title>
                            <Form.Label htmlFor={movie._id} className='btn btn-secondary'>
                              <Card.Img src={movie.ImagePath} className='movie__img' />
                            </Form.Label>
                            <input readOnly className='d-none' id={movie._id} value={movie._id} />
                            <Button onClick={e => this.handleSubmit(e)} value={movie._id} type='submit' className='fs-6'>Add to favorites</Button>
                          </Card>
                        </Col>
                      )
                    })}
                </CardGroup>
                <Form.Group className='modal-footer' />
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Modal)
