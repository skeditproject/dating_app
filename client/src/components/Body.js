// Body.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import Onboarding from './Onboarding';
import ResetPassword from './auth/ResetPassword';
import Account from './Account';

function Body({ user, setUser, showAuth, setShowAuth, isEditingProfile, setIsEditingProfile, showViewedUser, setShowViewedUser, cable }) {
  return (
    <main>
      <Routes>
        <Route path="/" element={
          <Home
            user={user}
            setUser={setUser}
            showAuth={showAuth}
            setShowAuth={setShowAuth}
            setIsEditingProfile={setIsEditingProfile}
          />
        } />
        <Route path="/dashboard" element={
          <Dashboard
            user={user}
            cable={cable}
            setShowAuth={setShowAuth}
            showViewedUser={showViewedUser}
            setShowViewedUser={setShowViewedUser}
          />
        } />
        <Route path="/onboarding" element={
          <Onboarding
            user={user}
            setUser={setUser}
            showAuth={showAuth}
            isEditingProfile={isEditingProfile}
          />
        } />
        <Route path="/reset_password/:token" element={
          <ResetPassword setUser={setUser} />
        } />
        <Route path="/account" element={
          <Account
            user={user}
            showViewedUser={showViewedUser}
            setShowViewedUser={setShowViewedUser}
            setIsEditingProfile={setIsEditingProfile}
            showAuth={showAuth}
            setShowAuth={setShowAuth}
            setUser={setUser}
          />
        } />
      </Routes>
    </main>
  );
}

export default Body;
