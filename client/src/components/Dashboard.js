import React, { useEffect, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import SearchUsers from './SearchUsers';

function Dashboard({ user, cable, setShowAuth, showViewedUser, setShowViewedUser }) {
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState(null);
  const [matchUsers, setMatchUsers] = useState([]);
  const [recipient, setRecipient] = useState({});
  const swipeContainerRef = useRef(null);

  function swiped(direction, id) {
    setLastDirection(direction);
    setTimeout(() => {
      setLastDirection(null);
    }, 3000);
    if (direction === 'right' || direction === 'left') {
      fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          browsed_user_id: id,
          liked: direction === 'right',
        }),
      }).then((r) => {
        if (r.ok) {
          fetch(`/api/users/${user.id}`)
            .then((r) => {
              if (r.ok) {
                r.json().then((data) => {
                  setMatchUsers(data);
                });
              }
            });
        }
      });
    }
  }

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gender_identity: user.gender_identity,
          gender_interest: user.gender_interest,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => setCharacters(data));
        }
      });
    }
  }, [user.id, user.gender_identity, user.gender_interest]);

  const handleSearchResults = (results) => {
    setCharacters(results); // Update characters with search results
  };

  return (
    <div className="dashboard background">
      <SearchUsers onSearchResults={handleSearchResults} />
      <div className="dashboard-body">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.id}
              onSwipe={(direction) => swiped(direction, character.id)}
            >
              <div
                style={{ backgroundImage: `url(${character.url1})` }}
                className="card"
              >
                <h3>{character.first_name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
        {lastDirection && <h2 className="swipe-info">You swiped {lastDirection}</h2>}
      </div>
    </div>
  );
}

export default Dashboard;
