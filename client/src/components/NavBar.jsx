import React from 'react'
import '../styles/NavBar.css'
import OptiHire from '../Optihire.png'

const NavBar = () => {
    const isLoggedIn = localStorage.getItem('token')
    console.log(isLoggedIn)
  return (
    <div className="navbar navbar__container">
        <div className="navbar__title" onClick={() => window.location.href = '/'}>
            <div className="navbar__logo">
                <img src={OptiHire} alt="logo" height={60} />
            </div>
            <div className="navbar__name">OptiHire</div>
        </div>
        <div className="navbar__right__menu">
            <div className="navbar__item">Login</div>
            <div className="navbar__item">Sign Up</div>
        </div>
    </div>
  )
}

export default NavBar