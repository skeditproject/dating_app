import React, { useEffect, useState } from 'react'
import { FaCommentDots } from 'react-icons/fa'
import Chat from './Chat'
import UserProfile from '../UserProfile'

function MatchList({
  user,
  matchUser,
  cable,
  showUnreadMessages,
  setShowUnreadMessages,
  setRecipient,
  showViewedUser,
  setShowViewedUser,
  setMatchChatDisplay,
  matchChatDisplay
}) {
  const [pairId, setPairId] = useState(null)
  const [messages, setMessages] = useState(null)


  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/matches/${matchUser.id}`)
        .then((r) => {
          if (r.ok) {
            r.json().then((data) => setPairId(data.pair_id))
          }
        })
    }
  }, [user, matchUser, pairId, setPairId])

  const handleChatList = () => {
    if (user.id) {
      fetch(`/api/users/${user.id}/message_history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_id: user.id,
          recipient_id: matchUser.id,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setMessages(data)
            setPairId(data[0]['pair_id'])
            setMatchChatDisplay(1)
          })
        }
      })
    }
  }

  const handleViewProfileClick = () => {
    setShowViewedUser(matchUser)
    setRecipient(matchUser)
  }

  return (
    <div className="match-list">
      <div
        className="match-list-content"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={handleViewProfileClick}
        >
          <img
            className="profile-photo"
            src={matchUser.url1}
            alt="profile"
            style={{ marginRight: '10px' }}
          />
          <div>
            <h3>{matchUser.first_name}</h3>
            <p>{matchUser.about}</p>
          </div>
        </div>
        <FaCommentDots
          onClick={handleChatList}
          style={{ cursor: 'pointer', color: 'blue', fontSize: '50px' }}
        />
        {messages && (
          <Chat
            user={user}
            showUnreadMessages={showUnreadMessages}
            setShowUnreadMessages={setShowUnreadMessages}
            setMatchChatDisplay={setMatchChatDisplay}
            matchChatDisplay={matchChatDisplay}
            recipient={matchUser}
            cable={cable}
          />
        )}
        {showViewedUser?.id === matchUser.id && (
          <UserProfile
            key={matchUser.id}
            user={matchUser}
            showViewedUser={showViewedUser}
            setShowViewedUser={setShowViewedUser}
          />
        )}
      </div>
    </div>
  )
}

export default MatchList
