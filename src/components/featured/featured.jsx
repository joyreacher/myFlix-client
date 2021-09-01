import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Col, Card, Button} from 'react-bootstrap'

// Actions
import { loadUser } from '../../actions/actions'

const mapStateToProps = state => {
  const { user, profile } = state
  return { user, profile }
}
function Featured ({ movies, user, profile, loadUser }) {
  console.log(user)
  console.log(profile)

  const addMovie = (e) => {
    console.log(e.target.value)
    e.preventDefault()
    const accessToken = localStorage.getItem('token')
    // error('')
    console.log(e.target)
    // check db for movie
    const result = movies.find(({ _id }) => _id === e.target.value)
    console.log('resulttttt')
    console.log(result)
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
        Title: result.title
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => {
        // setSub(null)
        const data = res.data
        console.log(data)
      })
        .catch(e => {
          console.log(e)
        })
    }
  }

  useEffect(() => {
    console.log('loadeded')
    const username = localStorage.getItem('user')
    const accessToken = localStorage.getItem('token')
    let mongoData = ''
    axios.get(`https://cinema-barn.herokuapp.com/user/${username}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      mongoData = res.data
      console.log(mongoData)
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
                  <img className="card-img-top mb-5 mb-md-0" src={movie.ImagePath} alt='movie poster' />
                </Col>
                <Col  md={6} lg={8}>
                  {/* <div className='small mb-1'>{movie.Genre.Name}</div> */}
                  <h1 className="display-5 fw-bolder">{movie.Title}</h1>
                  <div className="fs-5 mb-3">
                      <span>{movie.Genre.Name}</span>
                  </div>
                  <p className="lead">{movie.Description}</p>
                  <div className="d-flex justify-content-lg-evenly">
                      {/* <input className="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" readOnly/> */}
                      <button className="btn btn-outline-dark flex-shrink-0" type="button" value={movie._id} onClick={addMovie}>
                          <i className="bi-cart-fill me-1"></i>
                          Add to favorites
                      </button>
                      <Link className="btn btn-outline-dark flex-shrink-0" to={`/movies/${movie._id}`}>
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
