import React, { useEffect, useState, useRef } from 'react'
import Home from './Home'
import Dashboard from './Dashboard'
import Onboarding from './Onboarding'
import { Route, Routes } from 'react-router-dom'
import ResetPassword from './auth/ResetPassword'
import Account from './Account'
import Footer from './Footer'
import NavBar from './NavBar'
import MatchLists from './Chat/MatchLists'
import ChatLists from './Chat/ChatLists'

function App({ cable }) {
  const [user, setUser] = useState({})
  const [showAuth, setShowAuth] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [showViewedUser, setShowViewedUser] = useState(false)
  const [prevMatchChatDisplay, setPrevMatchChatDisplay] = useState(null)
  const [showUnreadMessages, setShowUnreadMessages] = useState({})
  const swipeContainerRef = useRef(null)
  const [matchUsers, setMatchUsers] = useState([])
  const [recipient, setRecipient] = useState({})
  const [isSignUp, setIsSignUp] = useState(null)
  const [isForgettingPassword, setIsForgettingPassword] = useState(false)
  const [matchChatDisplay, setMatchChatDisplay] = useState(0)

  useEffect(() => {
    fetch('/api/me')
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setUser(data))
        } else {
          if (r.status == 401) {
            r.json().then((data) => {
              console.log({ data: data.errors })
            })

          }
        }
      })
  }, [])

  // useEffect(() => {
  //   async function remainLoggedIn() {
  //     const response = await fetch('/api/me')
  //     if (response.ok) {
  //       const data = await response.json()
  //       setUser(data)
  //     }    
  //   }
  //   remainLoggedIn()    
  // }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={
          <NavBar user={user}
            setUser={setUser}
            showAuth={showAuth}
            setShowAuth={setShowAuth}
            setIsSignUp={setIsSignUp}
          >
            <Home
              user={user}
              setUser={setUser}
              showAuth={showAuth}
              setShowAuth={setShowAuth}
              isSignUp={isSignUp}
              setIsSignUp={setIsSignUp}
            />
          </NavBar>
        }
        />
        <Route path='/dashboard' element={
          <NavBar user={user}
            setUser={setUser}
            showAuth={showAuth}
            setShowAuth={setShowAuth}
            setIsSignUp={setIsSignUp}
          >

            <Dashboard
              user={user}
              cable={cable}
              setShowAuth={setShowAuth}
              showViewedUser={showViewedUser}
              setShowViewedUser={setShowViewedUser}
            />
          </NavBar>

        }
        />
        <Route path='/matches' element={
          <NavBar user={user}
            setUser={setUser}
            showAuth={showAuth}
            setShowAuth={setShowAuth} setIsSignUp={setIsSignUp}>

            <MatchLists
              user={user}
              cable={cable}
              setPrevMatchChatDisplay={setPrevMatchChatDisplay}
              swipeContainerRef={swipeContainerRef}
              showUnreadMessages={showUnreadMessages}
              setShowUnreadMessages={setShowUnreadMessages}
              matchUsers={matchUsers}
              setMatchUsers={setMatchUsers}
              setShowViewedUser={setShowViewedUser}
              showViewedUser={showViewedUser}
              setMatchChatDisplay={setMatchChatDisplay}
              matchChatDisplay={matchChatDisplay}
              setRecipient={setRecipient} />
          </NavBar>

        }
        />
        <Route path='/chat-list' element={
          <NavBar user={user}
            setUser={setUser}
            showAuth={showAuth}
            setShowAuth={setShowAuth} setIsSignUp={setIsSignUp}>

            <ChatLists
              user={user}
              cable={cable}
              setPrevMatchChatDisplay={setPrevMatchChatDisplay}
              showUnreadMessages={showUnreadMessages}
              setShowUnreadMessages={setShowUnreadMessages}
              matchUsers={matchUsers}
              setMatchUsers={setMatchUsers}
              setMatchChatDisplay={setMatchChatDisplay}
              matchChatDisplay={matchChatDisplay}
              setRecipient={setRecipient} />
          </NavBar>

        }
        />
        <Route path='/onboarding' element={
          <NavBar user={user}
            setUser={setUser}
            showAuth={showAuth}
            setShowAuth={setShowAuth} setIsSignUp={setIsSignUp}>

            <Onboarding
              user={user}
              setUser={setUser}
              showAuth={showAuth}
              isEditingProfile={isEditingProfile}
            />
          </NavBar>
        }
        />
        <Route path='/reset_password/:token' element={
          <NavBar user={user}
            setUser={setUser}
            showAuth={showAuth}
            setShowAuth={setShowAuth} setIsSignUp={setIsSignUp}>

            <ResetPassword
              setUser={setUser}
            />
          </NavBar>
        }
        />
        <Route path='/account' element={
          <NavBar user={user}
            setUser={setUser}
            showAuth={showAuth}
            setShowAuth={setShowAuth} setIsSignUp={setIsSignUp}>

            <Account
              user={user}
              showViewedUser={showViewedUser}
              setShowViewedUser={setShowViewedUser}
              setIsEditingProfile={setIsEditingProfile}
              showAuth={showAuth}
              setShowAuth={setShowAuth}
              setUser={setUser}
            />
          </NavBar>
        }
        />

      </Routes>
      <Footer />
    </div>
  )
}

export default App