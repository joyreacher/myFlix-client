import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../loading-view/loading-view'
import { Row, Col, Container, Button, Form, FloatingLabel, CardGroup, Card } from 'react-bootstrap'
import './profile-view.scss'
import { ProfileUpdate } from './profile-view-update'

export default function ProfileView ({ user, onLoggedIn, getMovies }) {
  const [list, setList] = useState([])
  const [update, setUpdate] = useState(false)
  const [profile, setProfile] = useState([])
  const [modal, setModal] = useState(false)
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [selected, setSelected] = useState([])
  const [error, setError] = useState({
    add: ' '
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(favorites)
    const accessToken = localStorage.getItem('token')
    if (favorites.length != 0) {
      favorites.map(movie => {
        console.log(list.username)
        console.log(movie)
        axios.post(`https://cinema-barn.herokuapp.com/users/mymovies/add`, {
          Username: list.username,
          Title: movie.title
        }, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
          .then(res => {
            const data = res.data
            console.log(data)
          })
          .catch(e => {
            console.log(e)
          })
      })
    }
  }

  useEffect(() => {
    console.log('use effect watching selected state ' + selected)
  }, [selected])

  const addMovies = (e) => {
    selected.push(e.target.value)
    selected.forEach((id, index) => {
      console.log(id, index)
      if (id != list.favorite_movies[index]._id) {
        const result = movies.find(({ _id }) => _id === id)
        list.favorite_movies.push(result)
        let findDuplicates = arr => list.favorite_movies.filter((item, index) => list.favorite_movies.indexOf(item) != index)

        if (findDuplicates(list.favorite_movies)) {
          console.log('finding dups')
          const selectedIndex = list.favorite_movies.indexOf(findDuplicates(list.favorite_movies)[0])
          console.log(selectedIndex)
          if (selectedIndex > -1) {
            list.favorite_movies.splice(selectedIndex, 1)
          }
        }
      }
    })
    console.log(list.favorite_movies)

    // if (e.target.checked) {
    //   selected.push(e.target.value)
    //   selected.forEach((id, index) => {
    //     console.log(id, index)
    //     if (id != list.favorite_movies[index]._id) {
    //       const result = movies.find(({ _id }) => _id === id)
    //       list.favorite_movies.push(result)
    //     }
    //   })
    //   console.log(list.favorite_movies)
    // }
  }
  // Compare selected to all movies list
  // const addMovies = (e) => {
  //   // console.log(e.target)
  //   if (e.target.checked) {
  //     //!add the id value to selected array state
  //     selected.push(e.target.value)
  //     //!compare selected to fav list
  //     selected.map((id, i) => {
  //       // console.log(movie._id == selected)
  //       // console.log(movie)
  //       //? CHECK LIST STATE FOR SAME ID
  //       if (id != list.favorite_movies[i]._id) {
  //         list.favorite_movies.push(movies[i])
  //         let result = list.favorite_movies.filter(el => { return el })
  //         let duplicate = list.favorite_movies.indexOf(result)
  //         list.favorite_movies.splice(duplicate, 1)
  //         console.log(result)
  //       }else{
  //         console.log(list.favorite_movies[i].title + ' is already in your favorites list.')
  //       }
  //       console.log(list.favorite_movies)
  //     })
  //     // const dontAdd = selected.filter(x => !list.favorite_movies.includes(x))
  //     // console.log(dontAdd)
  //     // console.log(selected)
  //   }
  //   else {
  //     // console.log('unchecked')
  //     const selectedIndex = selected.indexOf(e.target.value)
  //     // const listIndex = list.favorite_movies.indexOf(e.target.value)
  //     if (selectedIndex > -1) {
  //       selected.splice(selectedIndex, 1)
  //       // list.favorite_movies.splice(listIndex, 1)
  //     }
  //     // console.log(list.favorite_movies)
  //     // const dontAdd = list.favorite_movies.filter(x => !movies.includes(x))
  //     // setSelected(dontAdd)
  //   }
  //   // console.log(difference)
  //   //   const dontAdd = difference.map(diff => {
  //   //     // console.log(diff)
  //   //     return diff
  //   //   })
  //   //   const compare = movies.map(movie => {
  //   //     return movie
  //   //     // if (diff._id != e.target.value) {
  //   //     //   favorites.push(movie)
  //   //     // }
  //   //   })
  //   //   console.log(dontAdd)
  //   //   console.log(e.target.value)
  //   //   dontAdd.forEach(existing => {
  //   //     console.log(existing)
  //   //     if (e.target.value == existing._id) {
  //   //       // look into compare for same id as e.target.value
  //   //       // let newMovie = list.favorite_movies.filter(x => !compare.includes(x))
  //   //       // console.log(movie.Title + ' was added')
  //   //       // console.log(newMovie)
  //   //       // favorites.push(movie)
  //   //       return console.log('remove ' + existing.title)
  //   //     } else {
  //   //       compare.forEach(compare => {
  //   //         if (e.target.value == compare._id && e.target.value !== existing._id) {
  //   //           console.log('add ' + compare.Title)
  //   //         }
  //   //       })
  //   //     }
  //   //   })
  //   //   // console.log(compare)
  //   // }
    // console.log('this is the main list ')
    // console.log(favorites)
    // e.target.form.map(input => {
    //   console.log(input)
    // })
    // list.favorite_movies.forEach(movie => {
    //   if (e.target.value == movie._id) {
    //     return console.log(e.target.value + ' is already in your favorites')
    //   }
    // })
    // movies.forEach(movie => {
    //   // if checked movie has same id as movie in main list add it to the favorites array
    //   if (e.target.value == movie._id) {
    //     favorites.push(movie)
    //   }
    // })
    // console.log(favorites)
  // }
  const cancelChanges = () => {
    setUpdate(false)
  }
  const updateInformation = (e) => {
    setUpdate(true)
  }

  // GETS ALL MOVIES
  const getAllMovies = () => {
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
      setModal(true)
      return movieData
    }).catch(function (error) {
      console.log(error)
    })
  }

  // GET USER DATA ON LOAD INCLUDING PICTURE
  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    axios.get(`https://cinema-barn.herokuapp.com/user/${user}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      setList(res.data)
      return axios.get(`https://randomuser.me/api/?results=1`)
    }).then(res => {
      const data = res.data
      setProfile(
        {
          picture: res.data.results[0].picture.large
        }
      )
      return data
    }).catch(function (error) {
      console.log(error)
    })
  }, [])

  if (list.length === 0) return <Loading />
  if (update) return (
    <ProfileUpdate user={user} cancelChanges={() => cancelChanges} randomProfile={profile} updateRef={update} />
  )
  return (
    <>
      <div className="modal" tabIndex="-1" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add movie to your favorites list</h5>
              <button onClick={()=> setModal(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Form onSubmit={(e) => handleSubmit(e)}>
                <CardGroup>
                  {movies.length == 0 ? '..loading' : movies.map(movie => {
                    return (
                      <Col key={movie._id} lg={6} className='p-3'>
                        <Card>
                          <Form.Label htmlFor={movie._id} className='btn btn-secondary'>
                            <Card.Img src={movie.ImgPath} className='movie__img' />
                          </Form.Label>
                          <Form.Check id={movie._id} value={movie._id} onChange={(e) => { addMovies(e) }} />
                          <Card.Title className='movie__title'>{movie.title}</Card.Title>
                        </Card>
                      </Col>
                    )
                  })}
                </CardGroup>
                <Form.Group className="modal-footer">
                  <Form.Control type="button" className="btn btn-secondary" data-bs-dismiss="modal" value='cancel' />
                  <Form.Control type="submit" className="btn btn-primary" value='Add' />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <h1 className='my-5 bg-dark text-light d-inline-block'>{list.username}'s Profile</h1>
        <Row className='my-5'>
          <Col lg={8} className='d-flex justify-content-lg-between w-100'>
            <Form.Control className='mx-5 w-25' type='submit' value='update profile' onClick={() => updateInformation()} />
          </Col>
  </Row>
        <div className='d-flex justify-content-center p-2 my-5'>
          <Row>
            <Col lg={4}>
              <img src={profile.picture} alt='Image goes here' />
              <p>{list.username}</p>
            </Col>
            <Col lg={4}>
              <CardGroup>
                {
                  list.favorite_movies.length === 0
                    ? <Container>
                      <p>Bummer, you have no moves saved.</p>
                      </Container>
                    : list.favorite_movies.map(movie => {
                      return (
                        <Card key={movie._id} className='m-3'>
                          <Card.Img src={movie.ImagePath} alt='no image available' />
                          <Card.Title>{movie.Title}</Card.Title>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Text>Details</Card.Text>
                          </Link>
                        </Card>
                      )
                    })
                }
              </CardGroup>
              <Button className='btn bg-dark' onClick={()=>getAllMovies()} data-bs-toggle="modal" data-bs-target="#exampleModal" >Add a movie!</Button>
            </Col>
            <Col lg={4}>
              <p className='fs-6'>{list.email}</p>
              <p className='fs-6'>{list.birthday}</p>
            </Col>
          </Row>
        </div>
    </Container>
    </>
  )
}
