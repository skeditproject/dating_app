import React, { useEffect, useState } from 'react'
import EmailPassword from './EmailPassword'
import NavBar from './NavBar'
import UserProfile from './UserProfile'
import { useNavigate } from 'react-router-dom'

function Account({ user, showAuth, setShowAuth, setIsEditingProfile, setUser, showViewedUser }) {
  const [showUserProfile, setShowUserProfile] = useState(true)
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.entries(user).length == 0) {
      navigate('/')
    }
  }, [])
  return (
    <div className="account background">
      <div className="account-body">
        <div className="account-button">
          <button autoFocus onClick={() => setShowUserProfile(true)}>Profile</button>
          <button onClick={() => setShowUserProfile(false)}>Security</button>
        </div>
        <div className="account-content">
          {showUserProfile
            ?
            <UserProfile user={user} setShowAuth={setShowAuth} setIsEditingProfile={setIsEditingProfile} showViewedUser={showViewedUser} />
            :
            <EmailPassword user={user} setUser={setUser} />}
        </div>
      </div>
    </div>
  )
}

export default Account