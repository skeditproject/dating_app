import React from 'react'
import { useNavigate } from 'react-router-dom'
import whiteLogo from '../images/white_logo.png'

function NavBar({ user, color, showAuth, setShowAuth, setIsSignUp, setUser, children }) {
  const navigate = useNavigate()

  function handleLoginClick() {
    setIsSignUp(false)
    setShowAuth(true)
  }

  function handleLogoutClick() {
    fetch('/api/logout', {
      method: 'DELETE'
    })
      .then(() => {
        setUser({})
        navigate('/')
      })
  }

  function handleSignUpClick() {
    setIsSignUp(true)
    setShowAuth(true)
  }

  function handleAccountClick() {
    setShowAuth(false)
    navigate('/account')
  }

  return (
    <>
      <nav>
        <div className="logo-container">
          {Object.entries(user).length === 0 || !user || !user.url1 ? <img className="logo" src={whiteLogo} alt="logo" />
            :
            <>
              <img className="profile-photo-header" src={user.url1} alt="profile" onClick={handleAccountClick} />
              <h1>{user.first_name}</h1>
            </>
          }
        </div>
        <div className="buttons-container">
          {user && user.id ? (
            <>
              <button className="nav-button" disabled={showAuth} onClick={() => navigate('/dashboard')}>
                Dashboard
              </button>
              <button className="nav-button" disabled={showAuth} onClick={() => navigate('/matches')}>
                Matches
              </button>
              <button className="nav-button" disabled={showAuth} onClick={() => navigate('/chat-list')}>
                Chat Lists
              </button>
              <button className="nav-button" disabled={showAuth} onClick={handleLogoutClick}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="nav-button" disabled={showAuth} onClick={handleLoginClick}>
                Login
              </button>
              <button className="nav-button" onClick={handleSignUpClick}>
                Create Account
              </button>
            </>
          )}
        </div>
      </nav>
      {children}
    </>
  )
}

export default NavBar