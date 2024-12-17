import React, { useState } from 'react'
import Auth from './auth/Auth'
import ForgetPassword from './auth/ForgetPassword'

function Home({ setUser, showAuth, setShowAuth, isSignUp, setIsSignUp }) {
  const [isForgettingPassword, setIsForgettingPassword] = useState(false)

  return (
    <div className="main background">
      <div className={showAuth ? "dim-layer" : ""}>
        <div className="home">
          <h1 className="primary-title">Find Your Best Match by Swiping Right</h1>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials">
          <h2 className="secondary-title">What Our Users Say</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <p className="testimonial-text">"I found the love of my life thanks to this app!"</p>
              <h4 className="testimonial-text">- Sarah</h4>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"The swiping feature is so intuitive and fun!"</p>
              <h4 className="testimonial-text">- John</h4>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"I've made so many amazing connections here!"</p>
              <h4 className="testimonial-text">- Emily</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional rendering for auth and forget password */}
      {isForgettingPassword
        ? <ForgetPassword setShowAuth={setShowAuth} setIsForgettingPassword={setIsForgettingPassword} />
        : showAuth && (
          <Auth
            setShowAuth={setShowAuth}
            isSignUp={isSignUp}
            setUser={setUser}
            setIsSignUp={setIsSignUp}
            setIsForgettingPassword={setIsForgettingPassword}
          />
        )
      }
    </div>
  )
}

export default Home
