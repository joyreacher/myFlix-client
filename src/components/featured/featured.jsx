import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Card, Button} from 'react-bootstrap'

function Featured ({ movies }) {
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
                      <button className="btn btn-outline-dark flex-shrink-0" type="button">
                          <i className="bi-cart-fill me-1"></i>
                          Add to favorites
                      </button>
                      <button className="btn btn-outline-dark flex-shrink-0" type="button">
                          <i className="bi-cart-fill me-1"></i>
                          More
                      </button>
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

export default Featured
