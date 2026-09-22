import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChittiContext } from '../context/ChittiContext.jsx';
import '../CSS/Profile.css';

export default function Profile() {
  const { userData, logout } = useContext(ChittiContext);
  const navigate = useNavigate();

  // Redirect or prompt if user is not logged in
  if (!userData) {
    return (
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        <div className="profile-card guest-card">
          <p>You are not logged in.</p>
          <button className="btn-signin" onClick={() => navigate('/signupsignin')}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Derive display information
  const displayName = userData?.username || userData?.email?.split('@')[0] || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>

      <div className="profile-card">
        <div className="profile-user-info">
          <div className="profile-avatar">{initial}</div>
          <span className="profile-username">{displayName}</span>
        </div>

        <button className="btn-signout" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}