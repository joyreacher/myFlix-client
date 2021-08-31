import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoginView } from '../login-view/login-view'
// Bootstrap

const mapStateToProps = state => {
  const { profile } = state
  return { profile }
}
// Custom styles
import './navbar.scss'

function Nav ({ onLogOutClick, user, profile }) {
  console.log(profile)
  if (!localStorage.getItem('token')) {
    return (    
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container px-4 px-lg-5">
          <Link className='home-link' to='/'>
            <span className='cinema'>Cinema</span>
            <span className='barn'>Barn</span>
          </Link>
        </div>
      </nav>
    )
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container px-4 px-lg-5">
          <Link className='home-link' to='/'>
            <span className='cinema'>Cinema</span>
            <span className='barn'>Barn</span>
          </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#!">All Products</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#!">Popular Items</a></li>
                            <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
                        </ul>
                    </li>
                    <li className="nav-item"><a className="nav-link" href="#!">Signed in as: <Link to={`/user/${profile.username}`}>{profile.username}</Link></a></li>
                </ul>
                <Link to={`/user/${profile.username}`}>
                    <img className="badge bg-dark text-white ms-1 rounded-pill d-inline-block w-50" src={localStorage.getItem('image')} />
                </Link>
                <form className="d-flex">
                    <button className="btn btn-outline-dark d-flex" type="button" onClick={() => onLogOutClick()}>
                        <i className="bi-cart-fill me-1"></i>
                        Logout
                    </button>
                </form>
            </div>
        </div>
    </nav>
  )
}

export default connect(mapStateToProps)(Nav)
