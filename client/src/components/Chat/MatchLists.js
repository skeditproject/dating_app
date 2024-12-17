import React, { useEffect } from 'react'
import MatchList from './MatchList'

function MatchLists({
  user,
  matchUsers,
  setMatchUsers,
  swipeContainerRef,
  cable,
  showUnreadMessages,
  setShowUnreadMessages,
  setPrevMatchChatDisplay,
  setMatchChatDisplay,
  matchChatDisplay,
  setRecipient,
  setShowViewedUser,
  showViewedUser }) {

  useEffect(() => {
    if (user.id) {
      cable.subscriptions.create
        (
          {
            channel: 'UserMatchChannel',
            user_id: user.id
          },
          {
            received: (matchUser) => {
              setMatchUsers([...matchUsers, matchUser])
            }
          }
        )
    }
  }, [user.id, setMatchUsers, cable.subscriptions, matchUsers])

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}`)
        .then((r) => {
          if (r.ok) {
            r.json().then((data) => setMatchUsers(data))
          }
        })
    }
  }, [user.id, setMatchUsers])

  return (
    <div className="match-lists background">
      {matchUsers.map((matchUser) => {
        return (
          <MatchList
            key={matchUser.id}
            user={user}
            swipeContainerRef={swipeContainerRef}
            setShowViewedUser={setShowViewedUser}
            showViewedUser={showViewedUser}
            matchUser={matchUser}
            setMatchChatDisplay={setMatchChatDisplay}
            matchChatDisplay={matchChatDisplay}
            setPrevMatchChatDisplay={setPrevMatchChatDisplay}
            setRecipient={setRecipient}
            showUnreadMessages={showUnreadMessages}
            setShowUnreadMessages={setShowUnreadMessages}
            cable={cable} />
        )
      })}
    </div>
  )
}

export default MatchLists
