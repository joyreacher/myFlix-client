import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'

// Actions
import { loadUser } from '../../actions/actions'
// styles
import './featured.scss'

const mapStateToProps = state => {
  const { user } = state
  return { user }
}
function Featured ({ movies, user, loadUser }) {
  const addMovie = (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem('token')
    // check db for movie
    const result = movies.find(({ _id }) => _id === e.target.value)
    // check favorite movies in user state
    const matchFavs = user.favorite_movies.find(({ _id }) => _id === e.target.value)
    if (matchFavs) {
      e.target.setAttribute('match', true)
      e.target.setAttribute('disabled', 'disabled')
      e.target.insertAdjacentHTML('afterend', "<span style='color:red'>This movie is in your favorites</span>")
      return false
    } else {
      return axios.post('https://cinema-barn.herokuapp.com/users/mymovies/add', {
        Username: user.username,
        Title: result.Title
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => {
        e.target.setAttribute('match', true)
        e.target.setAttribute('disabled', 'disabled')
        e.target.insertAdjacentHTML('afterend', `<span style='color: green; padding: 1em'>${result.Title} was added to your favorites</span>`)
      })
        .catch(e => {
          console.log(e)
        })
    }
  }

  useEffect(() => {
    const username = localStorage.getItem('user')
    const accessToken = localStorage.getItem('token')
    let mongoData = ''
    axios.get(`https://cinema-barn.herokuapp.com/user/${username}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      mongoData = res.data
      loadUser(mongoData.username, mongoData.email, mongoData.birthday, mongoData.favorite_movies)
      return mongoData
    }).catch(function (error) {
      console.log(error)
    })
  }, [])

  return (
    <>
      {
      movies.map(movie => {
        if (movie.Featured === true) {
          return (
            <div className='container px-4 px-lg-5 my-5' key={`featured-${movie._id}`}>
              <div className='row gx-4 gx-lg-5 align-items-center'>
                <Col lg={4}>
                  <img className="shadow-1 card-img-top mb-5 mb-md-0" src={movie.ImagePath} alt='movie poster' />
                </Col>
                <Col  md={6} lg={8}>
                  <h2 className="display-5 fw-bolder">{movie.Title}</h2>
                  <div className="fs-5 mb-3">
                      <p>{movie.Genre.Name}</p>
                  </div>
                  <p className="fs-6 genre">{movie.Description}</p>
                  <div className="d-flex justify-content-lg-evenly">
                      <button className="shadow-1 btn btn-outline-dark flex-shrink-0" type="button" value={movie._id} onClick={addMovie}>
                          <i className="bi-cart-fill me-1"></i>
                          Add to favorites
                      </button>
                      <Link className="shadow-1 btn btn-outline-dark flex-shrink-0" to={`/movies/${movie._id}`}>
                        <i className="bi-cart-fill me-1"></i>
                          More
                      </Link>
                  </div>
                </Col>
              </div>
            </div>
          )
        }
      })
      }
    </>
  )
}

export default connect(mapStateToProps, { loadUser })(Featured)
