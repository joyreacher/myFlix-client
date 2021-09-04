import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoginView } from '../login-view/login-view'
// Bootstrap
import { image } from '../../actions/actions'
const mapStateToProps = state => {
  const { profile, loadImage, movies } = state
  return { profile, loadImage, movies }
}
// Custom styles
import './navbar.scss'
import ElementLoader from '../element-loader/element-loader'

function Nav ({ onLogOutClick, user, profile, loadImage, movies }) {
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
          <Link className='home-link w-50' to='/'>
            <span className='cinema'>Cinema</span>
            <span className='barn'>Barn</span>
          </Link>
          
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 d-flex align-content-center">
                    <li className="nav-item mt-4 mt-md-0 d-flex align-content-lg-end"><Link className="nav-link" to={`/user/${profile.username}`}>Signed in as: {profile.username}</Link></li>
                    <li className="nav-item mt-4 mt-md-0">
                    <Link to={`/user/${profile.username}`}>
                      {!loadImage.image ? <ElementLoader /> : <img className="nav-link shadow-1 badge bg-dark text-white ms-1 rounded-pill d-inline-block w-50" src={loadImage.image} /> }
                    </Link>
                    </li>
                </ul>
                <form className="d-flex">
                    <button className="shadow-1 btn btn-outline-dark d-flex" type="button" onClick={() => onLogOutClick()}>
                        <i className="bi-cart-fill me-1"></i>
                        Logout
                    </button>
                </form>
            </div>
        </div>
    </nav>
  )
}

export default connect(mapStateToProps, { image })(Nav)
